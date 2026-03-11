# Codebase Architecture — Value Creation Stream (discovery site)

## High-level structure

- Single-page style **HTML documents** per концепция потока ценности:
  - `index.html` — главная обзорная страница Value Creation Stream (Filtration → Discovery/VDO → Delivery).
  - `framework-selection.html` — подробный интерактивный гайд по выбору discovery framework (Product / Project / Ops / Strategic / Experimentation).
  - `delivery.html`, `cross-process.html`, `process-board.html`, `holst-process-diagram.html`, `executive-dashboard.html` и др. — специализированные представления отдельных участков сквозного процесса.
- Общие **UI‑слои и поведение** вынесены в:
  - `css/variables.css` — дизайн‑токены и цветовая тема.
  - `css/shared.css` — общие layout/типографика/компоненты.
  - `css/nav.css` — навигационная панель и заголовки.
  - `nav.js` — динамическая навигация и подсветка активного раздела.
  - `feedback-widget.js` + `api/feedback.js` — лёгкий feedback‑виджет и backend‑обработчик.

## Pages and flows

- `index.html`:
  - Описывает трёхслойную модель: Initiative Governance (Filtration/PI Planning/Portfolio), Discovery Governance (VDO Board, 5 frameworks), Delivery Execution (GO/NO‑GO, routing, implementation).
  - Содержит сетку ссылок на остальные артефакт‑страницы (delivery и т.д.) и тем самым играет роль «портала» в карту сквозного процесса.
- `framework-selection.html`:
  - Реализует сложный одностраничный интерфейс (tabs, pipeline, accordions) для выбора правильного discovery‑framework по типу инициативы и степеням неопределённости.
  - Локальный JS (inline) управляет вкладками, аккордеонами, подсветкой pipeline и, вероятно, небольшими интерактивными подсказками; бизнес‑логики данных/бэкенда нет.

## Runtime model

- Приложение **статическое**: нет единого SPA‑фреймворка, каждая страница — отдельный HTML‑документ с общими стилями и навигацией.
- Состояние минимально и хранится в DOM (выбор вкладок/аккордеонов); нет централизованного стейта или API‑клиента, кроме отправки фидбэка.
- Серверные части (например, `api/feedback.js`) используются точечно и не формируют полноценный backend‑слой домена ценности.

## Implications for value management system

- Текущая кодовая база хорошо описывает **концептуальную модель** Value Creation Stream и UX‑шаблоны, но **не реализует управляемый объектный слой инициатив, гипотез ценности, метрик и портфеля**.
- Для системы управления ценностью придётся:
  - Ввести доменную модель (инициативы, гипотезы, стадии потока, метрики).
  - Добавить устойчивый сторедж (файлы/БД) и API‑слой.
  - Постепенно эволюционировать статические страницы в более «приложенческий» режим (или отдельное SPA/серверное приложение), сохранив сильные стороны текущей визуальной карты.

