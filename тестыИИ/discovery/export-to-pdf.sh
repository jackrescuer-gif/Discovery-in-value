#!/bin/bash

# Скрипт для экспорта процесса Discovery в PDF
# Использует headless Chrome для конвертации HTML в PDF

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
PDF_FILE="$SCRIPT_DIR/discovery-process.pdf"
HTML_FILE="$SCRIPT_DIR/pdf-export.html"

echo "📄 Экспорт процесса Discovery в PDF..."

# Проверка наличия Chrome/Chromium
if command -v google-chrome &> /dev/null; then
    CHROME_CMD="google-chrome"
elif command -v chromium-browser &> /dev/null; then
    CHROME_CMD="chromium-browser"
elif command -v /Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome &> /dev/null; then
    CHROME_CMD="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"
elif command -v /Applications/Chromium.app/Contents/MacOS/Chromium &> /dev/null; then
    CHROME_CMD="/Applications/Chromium.app/Contents/MacOS/Chromium"
else
    echo "❌ Chrome/Chromium не найден. Используйте альтернативный метод."
    echo ""
    echo "Альтернативный метод:"
    echo "1. Откройте файл pdf-export.html в браузере"
    echo "2. Нажмите Cmd+P (Mac) или Ctrl+P (Windows/Linux)"
    echo "3. Выберите 'Сохранить как PDF'"
    exit 1
fi

# Конвертация в PDF
if [ -f "$HTML_FILE" ]; then
    echo "🔄 Конвертация HTML в PDF..."
    "$CHROME_CMD" --headless --disable-gpu --print-to-pdf="$PDF_FILE" --print-to-pdf-no-header "file://$HTML_FILE" 2>/dev/null
    
    if [ -f "$PDF_FILE" ]; then
        echo "✅ PDF успешно создан: $PDF_FILE"
        echo "📁 Размер файла: $(du -h "$PDF_FILE" | cut -f1)"
    else
        echo "❌ Ошибка при создании PDF"
        echo ""
        echo "Попробуйте альтернативный метод:"
        echo "1. Откройте файл pdf-export.html в браузере"
        echo "2. Нажмите Cmd+P (Mac) или Ctrl+P (Windows/Linux)"
        echo "3. Выберите 'Сохранить как PDF'"
        exit 1
    fi
else
    echo "❌ Файл $HTML_FILE не найден"
    exit 1
fi
