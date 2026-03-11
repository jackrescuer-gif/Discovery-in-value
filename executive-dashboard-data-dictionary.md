# Executive Dashboard — Data Dictionary

## Цель

Единая спецификация расчёта метрик для C-level dashboard по процессу Discovery и проверке гипотез.

## Базовая сущность

`hypothesis`:

- `id` — идентификатор гипотезы (уникальный ключ)
- `title` — формулировка гипотезы
- `category` — направление (`growth | value | retention | efficiency`)
- `product` — продукт/домен
- `team` — ответственная команда
- `status` — текущий статус (`formulated | prioritized | testing | confirmed | rejected | implemented`)
- `confidence` — уровень уверенности, %
- `effort` — сложность реализации, шкала 1..5
- `reach` — потенциальный охват/эффект (условные единицы)
- `costDirect` — прямые затраты
- `costIndirect` — косвенные затраты
- `createdAt` — дата формулирования
- `prioritizedAt` — дата приоритизации
- `researchStart` — дата старта исследования
- `researchEnd` — дата завершения исследования
- `decisionAt` — дата решения по гипотезе

## KPI и формулы

### 1) Total Validation Cost (TVC)
Сумма прямых и косвенных затрат по гипотезам в активных/решённых статусах за выбранный период.

`TVC = SUM(costDirect + costIndirect)`

### 2) Research Count
Количество завершённых исследований в периоде.

`Research Count = COUNT(hypothesis WHERE researchEnd IN period)`

### 3) Confirmed Hypotheses
Количество гипотез со статусами `confirmed` или `implemented`, по которым решение принято в периоде.

`Confirmed = COUNT(hypothesis WHERE decisionAt IN period AND status IN [confirmed, implemented])`

### 4) Hypothesis Success Rate
Доля подтверждённых среди проверенных.

`Success Rate = Confirmed / Tested`

где:

`Tested = COUNT(hypothesis WHERE decisionAt IN period AND status IN [confirmed, rejected, implemented])`

### 5) Research Velocity
Скорость проведения исследований в неделю.

`Research Velocity = Research Count / Weeks(period)`

### 6) Validation Velocity (days)
Медианное время от приоритизации до решения.

`Validation Velocity = MEDIAN(decisionAt - prioritizedAt)`

### 7) Cost per Validated Hypothesis
Стоимость одного подтверждённого результата.

`Cost per Validated = TVC / Confirmed`

## Data quality flags

- **Missing dates %**  
  `COUNT(records with missing required dates) / COUNT(all records)`
- **Missing costs %**  
  `COUNT(records with missing costDirect/costIndirect) / COUNT(all records)`
- **Duplicate IDs %**  
  `(COUNT(all records) - COUNT(distinct id)) / COUNT(all records)`

## Alert thresholds (dashboard defaults)

- Budget overrun: `TVC > Budget * 1.10`
- Velocity degradation: `Validation Velocity > Benchmark * 1.20`
- Success risk: `Success Rate < Target`

## Источник

Для текущей версии страницы используется synthetic dataset, встроенный в `executive-dashboard.html`.  
При интеграции с реальными данными источником должны стать трекеры Discovery (Jira/Notion/BI витрины).
