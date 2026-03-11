// Простой виджет обратной связи, отправляющий комментарии в backend,
// который уже создаёт GitHub Issues.

(function () {
  const isLocal =
    window.location.hostname === 'localhost' ||
    window.location.hostname === '127.0.0.1';
  const FEEDBACK_API_URL = isLocal
    ? 'http://localhost:4000/api/feedback'
    : '/api/feedback';

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
    }, ['✉️ Обратная связь']);

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

  // Load external CSS for feedback widget
  if (!document.getElementById('fb-widget-style')) {
    const link = document.createElement('link');
    link.id = 'fb-widget-style';
    link.rel = 'stylesheet';
    link.href = 'css/feedback-widget.css';
    document.head.appendChild(link);
  }

  window.initFeedbackWidget = initFeedbackWidget;
})();

