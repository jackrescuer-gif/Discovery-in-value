# Блок-схемы процесса Discovery

## Основной процесс Discovery

```mermaid
flowchart TD
    Start([Инициатива после PI Planning<br/>с понятными ценностями]) --> Init[Инициализация Discovery]
    
    Init --> Team[Формирование команды]
    Init --> Scope[Определение scope и сроков]
    Init --> Tools[Настройка инструментов]
    
    Team --> Research[Исследование проблемы]
    Scope --> Research
    Tools --> Research
    
    Research --> UserResearch[Исследование пользователей]
    Research --> Competitor[Анализ конкурентов]
    Research --> Data[Анализ данных и метрик]
    
    UserResearch --> Hypotheses[Формулирование гипотез]
    Competitor --> Hypotheses
    Data --> Hypotheses
    
    Hypotheses --> Prioritize[Приоритизация гипотез]
    Prioritize --> Validate[Валидация гипотез]
    
    Validate --> QuickTest[Быстрое тестирование]
    QuickTest --> LowFi[Low-fidelity прототипы]
    LowFi --> UserTest1[Тестирование с пользователями]
    
    UserTest1 --> Decision{Гипотеза<br/>валидирована?}
    
    Decision -->|Нет| Pivot[Пивот/Итерация]
    Pivot --> Hypotheses
    
    Decision -->|Да| Prototype[Прототипирование решения]
    
    Prototype --> HighFi[High-fidelity прототипы]
    HighFi --> TechProto[Техническое прототипирование]
    TechProto --> MVPCheck{Готовый продукт<br/>или MVP?}
    
    MVPCheck -->|Да| MVPTest[Тестирование MVP<br/>на 10% пользователей]
    MVPCheck -->|Нет| ValidateSolution[Валидация решения]
    
    MVPTest --> MVPMetrics[Измерение метрик<br/>MVP на части аудитории]
    MVPMetrics --> MVPSuccess{MVP<br/>успешен?}
    
    MVPSuccess -->|Нет| IterateMVP[Итерация MVP]
    IterateMVP --> MVPTest
    
    MVPSuccess -->|Да| ScaleInfra[Масштабирование<br/>инфраструктуры]
    
    ScaleInfra --> ScalePlan[Планирование масштабирования<br/>для 100% нагрузки]
    ScalePlan --> ScaleResources[Увеличение ресурсов<br/>и пропускной способности]
    ScaleResources --> ScaleMonitor[Настройка мониторинга<br/>и алертинга]
    ScaleMonitor --> LoadTest[Нагрузочное<br/>тестирование]
    LoadTest --> DeployMVP[Развертывание<br/>в Production]
    
    ValidateSolution --> UserTest2[Тестирование с пользователями]
    UserTest2 --> Metrics[Измерение метрик]
    Metrics --> Feedback[Сбор обратной связи]
    
    Feedback --> Ready{Решение<br/>готово?}
    
    Ready -->|Нет| Iterate[Итерация прототипа]
    Iterate --> Prototype
    
    Ready -->|Да| Prepare[Подготовка к развертыванию]
    
    Prepare --> Doc[Документация]
    Prepare --> Estimate[Оценка сложности]
    Prepare --> Roadmap[План внедрения]
    
    Doc --> Handoff[Передача в команду<br/>разработки]
    Estimate --> Handoff
    Roadmap --> Handoff
    
    Handoff --> Dev[Разработка решения]
    Dev --> DeployStandard[Развертывание<br/>в Production]
    
    DeployMVP --> Rollout[Постепенный запуск:<br/>25% → 50% → 100%]
    DeployStandard --> Rollout
    
    Rollout --> Monitor[Мониторинг и<br/>стабилизация]
    Monitor --> Operations[Эксплуатация]
    
    Operations --> End([Решение работает<br/>в Production])
    
    style Start fill:#e1f5ff
    style End fill:#c8e6c9
    style Decision fill:#fff9c4
    style Ready fill:#fff9c4
    style MVPCheck fill:#fff9c4
    style MVPSuccess fill:#fff9c4
    style Pivot fill:#ffccbc
    style Iterate fill:#ffccbc
    style IterateMVP fill:#ffccbc
    style MVPTest fill:#e1bee7
    style ScaleInfra fill:#c5e1a5
    style DeployMVP fill:#81c784
    style DeployStandard fill:#81c784
    style Rollout fill:#a5d6a7
    style Operations fill:#66bb6a
```

## Детальный процесс валидации гипотез

```mermaid
flowchart LR
    Start([Гипотеза]) --> Formulate[Формулировка<br/>гипотезы]
    
    Formulate --> Criteria[Определение<br/>критериев успеха]
    Criteria --> Method[Выбор метода<br/>валидации]
    
    Method --> Exp[Эксперимент]
    Method --> Survey[Опрос]
    Method --> Interview[Интервью]
    Method --> Proto[Прототип]
    
    Exp --> Collect[Сбор данных]
    Survey --> Collect
    Interview --> Collect
    Proto --> Collect
    
    Collect --> Analyze[Анализ результатов]
    Analyze --> Result{Результат<br/>валидации}
    
    Result -->|Подтверждена| Next[Следующая гипотеза]
    Result -->|Опровергнута| Revise[Пересмотр гипотезы]
    Result -->|Частично| Refine[Уточнение гипотезы]
    
    Revise --> Formulate
    Refine --> Formulate
    Next --> End([Валидация завершена])
    
    style Start fill:#e1f5ff
    style End fill:#c8e6c9
    style Result fill:#fff9c4
    style Revise fill:#ffccbc
    style Refine fill:#fff9c4
```

## Процесс прототипирования и тестирования

```mermaid
flowchart TD
    Start([Валидированные гипотезы]) --> Design[Дизайн-процесс]
    
    Design --> Wireframe[Wireframes]
    Wireframe --> LowFi[Low-fidelity<br/>прототип]
    
    LowFi --> Test1[Внутреннее<br/>тестирование]
    Test1 --> Feedback1[Обратная связь]
    
    Feedback1 --> HighFi[High-fidelity<br/>прототип]
    
    HighFi --> DesignSystem[Дизайн-система]
    DesignSystem --> Interactive[Интерактивный<br/>прототип]
    
    Interactive --> Test2[Тестирование с<br/>пользователями]
    Test2 --> Metrics[Сбор метрик]
    Metrics --> Feedback2[Качественная<br/>обратная связь]
    
    Feedback2 --> Evaluate{Оценка<br/>результатов}
    
    Evaluate -->|Успешно| TechProto[Техническое<br/>прототипирование]
    Evaluate -->|Требует доработки| Refine[Доработка<br/>дизайна]
    
    Refine --> HighFi
    
    TechProto --> POC[Proof of Concept]
    POC --> Integration[Интеграционное<br/>тестирование]
    
    Integration --> FinalTest[Финальное<br/>тестирование]
    FinalTest --> Ready{Готово к<br/>production?}
    
    Ready -->|Да| Document[Документация]
    Ready -->|Нет| TechProto
    
    Document --> End([Готово])
    
    style Start fill:#e1f5ff
    style End fill:#c8e6c9
    style Evaluate fill:#fff9c4
    style Ready fill:#fff9c4
    style Refine fill:#ffccbc
```

## Временная шкала процесса Discovery

```mermaid
gantt
    title Временная шкала процесса Discovery
    dateFormat YYYY-MM-DD
    section Инициализация
    Формирование команды           :a1, 2026-02-20, 2d
    Определение scope              :a2, after a1, 1d
    section Исследование
    Исследование пользователей     :b1, after a2, 5d
    Анализ конкурентов             :b2, after a2, 3d
    Анализ данных                  :b3, after a2, 4d
    section Гипотезы
    Формулирование гипотез         :c1, after b1, 2d
    Приоритизация                  :c2, after c1, 1d
    section Валидация
    Быстрое тестирование           :d1, after c2, 3d
    Low-fi прототипы               :d2, after c2, 4d
    Тестирование с пользователями  :d3, after d2, 3d
    section Прототипирование
    High-fi прототипы              :e1, after d3, 5d
    Техническое прототипирование   :e2, after e1, 4d
    section Финальная валидация
    Тестирование решения           :f1, after e2, 4d
    Итерация                       :f2, after f1, 3d
    section Подготовка
    Документация                   :g1, after f1, 3d
    План внедрения                 :g2, after g1, 2d
```

## Роли и взаимодействие

```mermaid
graph TB
    subgraph "Команда Discovery"
        PM[Product Manager]
        UX[UX Researcher]
        Designer[UX/UI Designer]
        Tech[Tech Lead]
        Data[Data Analyst]
    end
    
    subgraph "Стейкхолдеры"
        Business[Business Owner]
        Users[Пользователи]
        Dev[Команда разработки]
    end
    
    PM -->|Координация| UX
    PM -->|Координация| Designer
    PM -->|Координация| Tech
    PM -->|Коммуникация| Business
    
    UX -->|Исследование| Users
    UX -->|Данные| Data
    UX -->|Результаты| PM
    
    Designer -->|Прототипы| Users
    Designer -->|Дизайн| Tech
    Designer -->|Результаты| PM
    
    Tech -->|Оценка| PM
    Tech -->|Спецификации| Dev
    
    Data -->|Метрики| PM
    Data -->|Анализ| UX
    
    Business -->|Требования| PM
    PM -->|Результаты| Business
    
    Users -->|Обратная связь| UX
    Users -->|Обратная связь| Designer
    
    PM -->|Handoff| Dev
    
    style PM fill:#4caf50
    style UX fill:#2196f3
    style Designer fill:#9c27b0
    style Tech fill:#ff9800
    style Data fill:#00bcd4
```

## Процесс масштабирования MVP в Production

```mermaid
flowchart TD
    Start([MVP успешно протестирован<br/>на 10% пользователей]) --> Analyze[Анализ результатов<br/>тестирования]
    
    Analyze --> Metrics[Оценка метрик:<br/>- Производительность<br/>- Пользовательский опыт<br/>- Бизнес-метрики]
    
    Metrics --> Decision{Метрики<br/>успешны?}
    
    Decision -->|Нет| Iterate[Итерация MVP]
    Iterate --> Start
    
    Decision -->|Да| PlanScale[Планирование<br/>масштабирования]
    
    PlanScale --> Capacity[Расчет требуемой<br/>мощности для 100%]
    Capacity --> InfraPlan[План инфраструктуры:<br/>- Вычислительные ресурсы<br/>- Пропускная способность<br/>- Хранилище данных]
    
    InfraPlan --> ScaleResources[Масштабирование ресурсов:<br/>- Увеличение серверов<br/>- Настройка балансировщиков<br/>- Расширение БД]
    
    ScaleResources --> Monitoring[Настройка мониторинга:<br/>- Метрики производительности<br/>- Алертинг<br/>- Логирование]
    
    Monitoring --> DeployProcess[Подготовка процессов:<br/>- Развертывание<br/>- Откат изменений<br/>- Резервное копирование]
    
    DeployProcess --> LoadTest[Нагрузочное тестирование:<br/>- Тест на 100% нагрузке<br/>- Стресс-тестирование<br/>- Проверка отказоустойчивости]
    
    LoadTest --> LoadResult{Тесты<br/>пройдены?}
    
    LoadResult -->|Нет| FixIssues[Исправление проблем]
    FixIssues --> ScaleResources
    
    LoadResult -->|Да| Rollout[Постепенный запуск:<br/>- 25% пользователей<br/>- 50% пользователей<br/>- 100% пользователей]
    
    Rollout --> Monitor[Мониторинг развертывания]
    Monitor --> Stable{Стабильно<br/>работает?}
    
    Stable -->|Нет| Rollback[Откат изменений]
    Rollback --> PlanScale
    
    Stable -->|Да| DeployComplete[Развертывание<br/>завершено]
    
    DeployComplete --> Operations[Эксплуатация:<br/>- Непрерывный мониторинг<br/>- Сбор обратной связи<br/>- Анализ метрик<br/>- Поддержка системы]
    
    Operations --> Success([Решение работает<br/>в Production])
    
    style Start fill:#e1f5ff
    style Success fill:#c8e6c9
    style Decision fill:#fff9c4
    style LoadResult fill:#fff9c4
    style Stable fill:#fff9c4
    style Iterate fill:#ffccbc
    style FixIssues fill:#ffccbc
    style Rollback fill:#ffccbc
    style ScaleResources fill:#c5e1a5
    style Rollout fill:#81c784
    style DeployComplete fill:#a5d6a7
    style Operations fill:#66bb6a
```
