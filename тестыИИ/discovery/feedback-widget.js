// Простой виджет обратной связи, отправляющий комментарии в backend,
// который уже создаёт GitHub Issues.

(function () {
  const FEEDBACK_API_URL = 'https://your-feedback-endpoint.example.com/api/feedback'; // ← поменяй под свой backend

  function createEl(tag, attrs, children) {
    const el = document.createElement(tag);
    if (attrs) {
      Object.entries(attrs).forEach(([k, v]) => {
        if (k === 'class') el.className = v;
        else if (k === 'for') el.htmlFor = v;
        else el.setAttribute(k, v);
      });
    }
    (children || []).forEach((child) => {
      if (typeof child === 'string') el.appendChild(document.createTextNode(child));
      else if (child) el.appendChild(child);
    });
    return el;
  }

  function initFeedbackWidget(pageId) {
    if (!pageId) pageId = document.body.getAttribute('data-page-id') || 'unknown';

    const btn = createEl('button', {
      class: 'fb-floating-btn',
      type: 'button'
    }, ['✉️ Фидбек']);

    const overlay = createEl('div', { class: 'fb-overlay', 'aria-hidden': 'true' });
    const dialog = createEl('div', { class: 'fb-dialog', role: 'dialog', 'aria-modal': 'true' });

    const title = createEl('div', { class: 'fb-title' }, ['Обратная связь по странице']);
    const desc = createEl('div', { class: 'fb-subtitle' }, ['Комментарий появится как issue в GitHub. Отметьте «Это задача», если это потенциальный todo.']);

    const form = createEl('form', { class: 'fb-form' });

    const textareaLabel = createEl('label', { for: 'fb-text' }, ['Комментарий']);
    const textarea = createEl('textarea', {
      id: 'fb-text',
      rows: '4',
      placeholder: 'Что улучшить, что непонятно, где баг...'
    });

    const nameLabel = createEl('label', { for: 'fb-author' }, ['Имя (опционально)']);
    const nameInput = createEl('input', {
      id: 'fb-author',
      type: 'text',
      placeholder: 'Например: CPO, CTO, Иван...'
    });

    const taskWrap = createEl('label', { class: 'fb-checkbox' });
    const taskCheckbox = createEl('input', { type: 'checkbox', id: 'fb-is-task' });
    const taskText = createEl('span', null, ['Это задача, которую нужно проработать']);
    taskWrap.appendChild(taskCheckbox);
    taskWrap.appendChild(taskText);

    const status = createEl('div', { class: 'fb-status', 'aria-live': 'polite' });

    const actions = createEl('div', { class: 'fb-actions' });
    const cancelBtn = createEl('button', { type: 'button', class: 'fb-btn fb-btn-secondary' }, ['Отмена']);
    const submitBtn = createEl('button', { type: 'submit', class: 'fb-btn fb-btn-primary' }, ['Отправить']);
    actions.appendChild(cancelBtn);
    actions.appendChild(submitBtn);

    form.appendChild(textareaLabel);
    form.appendChild(textarea);
    form.appendChild(nameLabel);
    form.appendChild(nameInput);
    form.appendChild(taskWrap);
    form.appendChild(status);
    form.appendChild(actions);

    const closeBtn = createEl('button', { type: 'button', class: 'fb-close', 'aria-label': 'Закрыть' }, ['×']);

    dialog.appendChild(closeBtn);
    dialog.appendChild(title);
    dialog.appendChild(desc);
    dialog.appendChild(form);
    overlay.appendChild(dialog);

    document.body.appendChild(btn);
    document.body.appendChild(overlay);

    function open() {
      overlay.classList.add('fb-overlay-open');
      textarea.focus();
    }

    function close() {
      overlay.classList.remove('fb-overlay-open');
      status.textContent = '';
      textarea.value = '';
      nameInput.value = '';
      taskCheckbox.checked = false;
    }

    btn.addEventListener('click', open);
    closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) close();
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const text = textarea.value.trim();
      if (!text) {
        status.textContent = 'Пожалуйста, опишите комментарий.';
        return;
      }

      status.textContent = 'Отправляем...';
      submitBtn.disabled = true;

      try {
        const payload = {
          pageId,
          url: window.location.href,
          text,
          author: nameInput.value.trim() || null,
          isTask: taskCheckbox.checked
        };

        const resp = await fetch(FEEDBACK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });

        if (!resp.ok) throw new Error('Request failed');
        status.textContent = 'Спасибо! Комментарий сохранён в GitHub.';
        setTimeout(close, 1200);
      } catch (err) {
        status.textContent = 'Не удалось отправить. Проверьте подключение или URL сервиса.';
      } finally {
        submitBtn.disabled = false;
      }
    });
  }

  // Стили виджета (инлайним, чтобы не плодить ещё один CSS-файл)
  const css = `
  .fb-floating-btn {
    position: fixed;
    right: 20px;
    bottom: 20px;
    z-index: 1100;
    border-radius: 999px;
    border: 1px solid rgba(30,58,95,0.18);
    background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
    color: #fff;
    padding: 9px 16px;
    font-size: 0.85rem;
    font-family: 'Inter', -apple-system, sans-serif;
    cursor: pointer;
    box-shadow: 0 8px 18px rgba(15,23,42,0.25);
  }
  .fb-floating-btn:hover {
    box-shadow: 0 10px 24px rgba(15,23,42,0.32);
  }
  .fb-overlay {
    position: fixed;
    inset: 0;
    background: rgba(15,23,42,0.55);
    display: none;
    align-items: center;
    justify-content: center;
    z-index: 1200;
    padding: 16px;
  }
  .fb-overlay-open {
    display: flex;
  }
  .fb-dialog {
    width: min(420px, 100%);
    background: #fff;
    border-radius: 12px;
    border: 1px solid #e2e8f0;
    box-shadow: 0 20px 60px rgba(15,23,42,0.5);
    padding: 18px 18px 16px;
    position: relative;
    font-family: 'Inter', -apple-system, sans-serif;
  }
  .fb-close {
    position: absolute;
    right: 10px;
    top: 8px;
    border: none;
    background: transparent;
    font-size: 1.4rem;
    cursor: pointer;
    color: #64748b;
  }
  .fb-title {
    font-size: 1rem;
    font-weight: 600;
    color: #111827;
    margin-bottom: 4px;
  }
  .fb-subtitle {
    font-size: 0.8rem;
    color: #64748b;
    margin-bottom: 10px;
  }
  .fb-form label {
    display: block;
    font-size: 0.78rem;
    font-weight: 600;
    color: #475569;
    margin-bottom: 4px;
  }
  .fb-form textarea,
  .fb-form input[type="text"] {
    width: 100%;
    border-radius: 8px;
    border: 1px solid #cbd5f5;
    padding: 7px 9px;
    font-family: inherit;
    font-size: 0.85rem;
    margin-bottom: 8px;
  }
  .fb-form textarea:focus,
  .fb-form input[type="text"]:focus {
    outline: none;
    border-color: #1e3a5f;
    box-shadow: 0 0 0 1px rgba(30,58,95,0.25);
  }
  .fb-checkbox {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: #475569;
    margin: 4px 0 8px;
  }
  .fb-checkbox input[type="checkbox"] {
    width: 14px;
    height: 14px;
  }
  .fb-status {
    min-height: 16px;
    font-size: 0.78rem;
    color: #64748b;
    margin-bottom: 6px;
  }
  .fb-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
  }
  .fb-btn {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 7px 12px;
    font-size: 0.8rem;
    cursor: pointer;
    font-family: inherit;
  }
  .fb-btn-primary {
    background: linear-gradient(135deg, #1e3a5f 0%, #2c5282 100%);
    color: #fff;
    border-color: rgba(15,23,42,0.1);
  }
  .fb-btn-secondary {
    background: #fff;
    color: #0f172a;
    border-color: #cbd5f5;
  }
  @media (max-width: 600px) {
    .fb-floating-btn {
      right: 12px;
      bottom: 12px;
      padding: 7px 12px;
      font-size: 0.8rem;
    }
  }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  window.initFeedbackWidget = initFeedbackWidget;
})();

