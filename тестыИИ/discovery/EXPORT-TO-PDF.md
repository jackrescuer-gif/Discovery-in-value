# Экспорт процесса Discovery в PDF

## Способ 1: Через браузер (самый простой)

1. Откройте файл `pdf-export.html` в браузере:
   ```bash
   open pdf-export.html
   ```
   или просто дважды кликните на файл

2. Нажмите `Cmd+P` (Mac) или `Ctrl+P` (Windows/Linux)

3. В диалоге печати:
   - Выберите "Сохранить как PDF" (Mac) или "Microsoft Print to PDF" (Windows)
   - Настройте параметры:
     - Размер бумаги: A4
     - Поля: Стандартные или Узкие
     - Масштаб: 100%
   - Нажмите "Сохранить"

4. Выберите место для сохранения PDF файла

## Способ 2: Через скрипт (требует Chrome)

Если у вас установлен Google Chrome или Chromium:

```bash
chmod +x export-to-pdf.sh
./export-to-pdf.sh
```

Скрипт автоматически создаст файл `discovery-process.pdf` в папке discovery.

## Способ 3: Через Python (требует установки библиотек)

### Установка зависимостей:

```bash
pip3 install weasyprint
```

### Создание PDF:

```bash
python3 -c "
from weasyprint import HTML
HTML('pdf-export.html').write_pdf('discovery-process.pdf')
"
```

## Способ 4: Через онлайн-конвертеры

1. Откройте `pdf-export.html` в браузере
2. Используйте онлайн-сервисы:
   - https://www.ilovepdf.com/html-to-pdf
   - https://www.freeconvert.com/html-to-pdf
   - https://html2pdf.com/

## Способ 5: Через pandoc (если установлен)

```bash
pandoc README.md -o discovery-process.pdf --pdf-engine=xelatex -V geometry:margin=2cm
```

## Рекомендации

- **Лучший способ:** Способ 1 (через браузер) - самый простой и не требует дополнительных инструментов
- **Для автоматизации:** Способ 2 или 3
- **Для версионирования:** Способ 1 или 3 (создают стабильный PDF)

## Примечания

- Файл `pdf-export.html` оптимизирован для печати в PDF
- Все диаграммы Mermaid из `visualization.html` не включены в PDF версию (они требуют JavaScript)
- Для включения интерактивных диаграмм используйте скриншоты или экспортируйте их отдельно
