# Контекст чата: рефакторинг Discovery под VDO

**Дата:** 2025-03-06  
**Цель:** Превратить раздел Discovery сайта в чёткую визуальную и концептуальную модель процесса **VDO (Validation Driven Opportunity)**.

---

## Что уже сделано

1. **README.md**  
   - Добавлен блок про Value Creation Stream v2: 3 слоя, 7 стадий, Discovery ≠ Product Discovery, Delivery Package, GO/NO-GO.  
   - Ниже оставлен детальный текст про Product Discovery как пример.

2. **visualization.html**  
   - **Hero / macro:** вместо KPI-подобных цифр — акцент на VDO, Opportunity, Evidence; макропайплайн: Idea → Filtering → Discovery (VDO) → Validated Opportunity → Delivery.  
   - **Discovery Overview (VDO):** описание того, что Discovery = расследование одной Opportunity; результат — Validated Opportunity / Pivot / Kill; всё фиксируется на **VDO Board**.  
   - **VDO Board:** добавлена структура артефакта (дерево: Opportunity → Problem Definition, Hypothesis, Market Signals, Solution Exploration, Experiments, Evidence, Decision) и пояснения по каждому блоку.  
   - **VDO Discovery Flow:** 7 шагов (1. Problem Definition → 2. Hypothesis → 3. Market Signals → 4. Solution Exploration → 5. Experiments → 6. Evidence → 7. Decision) в виде карточек с привязкой к блокам VDO-борда.  
   - **Outcomes:** три исхода — Validated Opportunity, Pivot, Kill — с кратким описанием.  
   - Убраны ссылки на executive-dashboard виджеты и overlay «виджет борда», чтобы Discovery не выглядел как отчётность/KPI-дашборд.  
   - Блоки Product Discovery сохранены и помечены как **пример framework-specific Discovery под VDO**.

---

## Модель VDO (краткая шпаргалка)

- **VDO** = Validation Driven Opportunity.  
- **Центральный артефакт:** **VDO Board** — всё в Discovery связано с ним.  
- **Объектная модель:** **Opportunity** (потенциальная инициатива после Filtering) → Discovery (расследование на VDO-борде) → **Validated Opportunity** (или Pivot / Kill).  
- **Структура VDO Board:**  
  - Opportunity  
  - Problem Definition  
  - Hypothesis  
  - Market Signals  
  - Solution Exploration  
  - Experiments  
  - Evidence  
  - Decision  

- **7 шагов потока:** Problem Definition → Hypothesis → Market Signals → Solution Exploration → Experiments → Evidence → Decision.  
- **Исходы:** Validated Opportunity (→ Delivery), Pivot (переформулировка и повтор шагов), Kill (прекращение работы по Opportunity).

---

## Что осталось сделать (когда вернёшься)

1. ~~**Дорефакторить текст Product Discovery**~~ — сделано: маппинг фаз на VDO-борд добавлен в visualization.html (фазы 1–3 → блоки VDO).  
2. ~~**Удалить/переименовать legacy Discovery**~~ — сделано: nav.js — «Дайджест процесса Discovery» → «Аналитика процесса», «Дайджест гипотез» → «Гипотезы»; index.html — карточки поданы как вспомогательные инструменты.  
3. ~~**Визуал**~~ — сделано: kpi-row/kpi-box переименованы в flow-row/flow-card; hero-блоки выглядят как flow/concept, не метрики.  
4. ~~**Опционально: VDO Board**~~ — сделано: страница `vdo-board.html` с investigation-board стилем, ссылки в nav, index, visualization.  
5. ~~**Другие страницы**~~ — index.html обновлён под VDO (Discovery Governance, ключевые концепции); nav.js обновлён.

---

## Важные файлы

| Файл | Назначение |
|------|------------|
| `visualization.html` | Основная страница Discovery; уже переведена на VDO Overview + Board + Flow + Outcomes. |
| `vdo-board.html` | Отдельная страница VDO Board — доска расследования в стиле investigation board. |
| `README.md` | Общая архитектура VCS v2; при смене на «полностью новую архитектуру» обновить отсюда. |
| `framework-selection.html` | Выбор способа реализации (Project / БФ-команда / не проектные); можно связать с «Validated Opportunity → Delivery Routing». |
| `hypothesis-digest.html` | Дайджест гипотез; не удалять, но не позиционировать как ядро Discovery. |
| `executive-dashboard.html` | Дашборд; не удалять, но убрать из контекста «это и есть Discovery». |
| `filtration.html` | Не менять (по правилам). |
| `delivery.html` | Не менять структуру (по правилам). |

---

## Ограничения из прошлых инструкций

- **Filtration** — страницу не изменять.  
- **Delivery** — структуру не менять.  
- Страницы не удалять, навигацию не ломать, ключевые файлы не переименовывать.  
- Discovery = процесс расследования (VDO), не отчётность.

Когда вернёшься — можно сказать «продолжаем VDO» и опираться на этот файл.
