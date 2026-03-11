# Value Stream — страница детальных этапов: план реализации

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Одна страница с детальным описанием 7 стадий потока создания ценности, сгруппированных по трём слоям; контент стадий подставляется из текста, который предоставит заказчик.

**Architecture:** Один HTML-файл `value-stream.html` с hero, блоком «Содержание» (якоря), тремя секциями по слоям (L1, L2, L3). В каждой секции — карточки стадий с единой разметкой (назначение, входы, выходы, роли, точки решений). Стили и навигация переиспользуются с one-pager и delivery.html. Тексты стадий вставляются в разметку при получении от заказчика.

**Tech Stack:** HTML5, CSS (variables.css, shared.css, nav.css), nav.js, feedback-widget.js.

**Design reference:** `docs/plans/2025-03-12-value-stream-stages-design.md`

---

## Task 1: Создать скелет страницы value-stream.html

**Files:**
- Create: `value-stream.html`

**Step 1: Создать файл с базовой разметкой**

- Doctype, `html lang="ru"`, head с meta, title «Value Stream — этапы процесса», подключение `css/variables.css`, `css/shared.css`, `css/nav.css`, `nav.js`, `feedback-widget.js`.
- Body: `#nav-placeholder`, контейнер, hero (h1 «Value Stream», подзаголовок «Три слоя, семь стадий — детальное описание»).
- Три пустые секции с id: `#layer-1`, `#layer-2`, `#layer-3` и заголовками «Layer 1 — Initiative Governance», «Layer 2 — Discovery Governance (VDO)», «Layer 3 — Delivery Execution».
- В конце body: `initFeedbackWidget('value-stream')`.

**Step 2: Проверить в браузере**

- Открыть `value-stream.html`. Должны отображаться шапка сайта (nav), hero и три заголовка секций.

**Step 3: Коммит**

```bash
git add value-stream.html
git commit -m "feat: add value-stream page skeleton"
```

---

## Task 2: Добавить блок «Содержание» и якорные ссылки

**Files:**
- Modify: `value-stream.html` (после hero, перед секциями)

**Step 1: Вставить блок навигации по странице**

- Секция с классом для стилей (например `toc`). Внутри: заголовок «Содержание», список ссылок:
  - «Layer 1 — Initiative Governance» → `#layer-1`
  - «Layer 2 — Discovery Governance (VDO)» → `#layer-2`
  - «Layer 3 — Delivery Execution» → `#layer-3`
- При необходимости добавить ссылки на стадии `#stage-1` … `#stage-7`.

**Step 2: Проверить**

- Клик по ссылкам — скролл к соответствующей секции.

**Step 3: Коммит**

```bash
git add value-stream.html
git commit -m "feat(value-stream): add in-page TOC with anchors"
```

---

## Task 3: Добавить стили для слоёв и карточек стадий

**Files:**
- Modify: `value-stream.html` (блок `<style>` в head или отдельный CSS)

**Step 1: Стили секций слоёв**

- Классы для `.layer-section` (или аналог): отступы, граница/фон по слою (L1/L2/L3 — разные акценты, например `--layer-1`, `--layer-2`, `--layer-3` из variables или локальные).
- Заголовок секции слоя с номером и названием.

**Step 2: Стили карточки стадии**

- Класс `.stage-card`: контейнер карточки (как на delivery.html — border-radius, тень, отступы).
- Внутри: `.stage-card-header` (номер стадии, название, бейдж слоя L1/L2/L3), `.stage-body` с блоками: назначение, входы, выходы, роли, точки решений. Использовать `.section-title`, списки/теги по аналогии с delivery.html.

**Step 3: Проверить**

- Временно добавить одну карточку-пример в Layer 1 (стадия 1). Убедиться, что внешний вид читаемый и согласован с сайтом.

**Step 4: Коммит**

```bash
git add value-stream.html
git commit -m "feat(value-stream): add layer and stage card styles"
```

---

## Task 4: Разметить все 7 карточек стадий с плейсхолдерами

**Files:**
- Modify: `value-stream.html`

**Step 1: Добавить карточки по слоям**

- **Layer 1:** стадии 1–3 (1. FILTRATION, 2. PI PLANNING, 3. INITIATIVE PORTFOLIO). Для каждой: id `stage-1` … `stage-3`, заголовок, блоки «Назначение», «Входы», «Выходы», «Роли», при необходимости «Точки решений». Текст-плейсхолдер: «[Описание будет добавлено]» или краткий текст из README.
- **Layer 2:** стадии 4–6 (4. VALUE DESIGN OFFICE, 5. FRAMEWORK SELECTION, 6. DELIVERY PACKAGE). Та же структура, id `stage-4` … `stage-6`.
- **Layer 3:** стадия 7 (7. IMPLEMENTATION & VALUE REALIZATION). id `stage-7`.

**Step 2: Проверить**

- Скролл по странице: все 7 карточек на месте, якоря из содержания ведут к секциям/стадиям.

**Step 3: Коммит**

```bash
git add value-stream.html
git commit -m "feat(value-stream): add all 10 stage cards with placeholders"
```

---

## Task 5: Подключить страницу в навигацию и на index

**Files:**
- Modify: `nav.js` (добавить ссылку в global-nav-links)
- Modify: `index.html` (обернуть «Value Stream подробно» в ссылку)

**Step 1: nav.js**

- В массив ссылок добавить: `<a href="value-stream.html" class="global-nav-link nav-link" data-page="value-stream.html">Value Stream</a>` (или «Этапы процесса» — по согласованию). Разместить логично, например после «Процесс Discovery» или первым в списке углублений.

**Step 2: index.html**

- Найти строку с «Value Stream подробно» в блоке «Куда идти глубже». Заменить на: `<a href="value-stream.html">Value Stream подробно</a> — три слоя, семь стадий, роли и точки принятия решений.` (или оставить список, но первый пункт сделать ссылкой).

**Step 3: Проверить**

- С index.html клик «Value Stream подробно» → переход на value-stream.html. В шапке сайта на value-stream.html пункт «Value Stream» подсвечен как активный.

**Step 4: Коммит**

```bash
git add nav.js index.html
git commit -m "feat: link value-stream page from nav and index"
```

---

## Task 6: Интегрировать тексты описаний стадий (по получении от заказчика)

**Files:**
- Modify: `value-stream.html` (блоки назначение/входы/выходы/роли/решения в каждой из 7 карточек)

**Step 1: Подставить контент**

- Заменить плейсхолдеры в каждой стадии на текст, полученный от заказчика. Сохранять структуру: назначение — абзацы; входы/выходы — списки или абзац; роли — теги или список; точки решений — только где применимо.

**Step 2: Проверить**

- Пройти все 7 стадий визуально: нумерация, слои, читаемость, отсутствие битых якорей.

**Step 3: Коммит**

```bash
git add value-stream.html
git commit -m "content(value-stream): integrate stage descriptions from stakeholder"
```

---

## Handoff

После выполнения плана (Tasks 1–5 страница готова к приёму контента; Task 6 — после получения текстов):

- **План сохранён:** `docs/plans/2025-03-12-value-stream-stages-implementation.md`
- **Дизайн:** `docs/plans/2025-03-12-value-stream-stages-design.md`

**Варианты выполнения:**

1. **Subagent-Driven (в этой сессии)** — выполняю задачи по одной, между задачами проверка.
2. **Отдельная сессия** — открываете новую сессию с executing-plans и выполняете план по чекпоинтам.

Когда пришлёте тексты описаний этапов, их можно встроить по Task 6.
