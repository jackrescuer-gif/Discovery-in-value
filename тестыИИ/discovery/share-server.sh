#!/bin/bash

# Скрипт для запуска локального сервера с доступом из сети
# Использование: ./share-server.sh

PORT=8004
DIR="/Users/pavelnovak/тестыИИ/discovery"

echo "🚀 Запуск сервера на порту $PORT"
echo "📁 Директория: $DIR"
echo ""
echo "Локальный доступ:"
echo "  http://localhost:$PORT/visualization.html"
echo ""
echo "Доступ из сети (замените YOUR_IP на ваш IP адрес):"
echo "  http://$(ipconfig getifaddr en0 2>/dev/null || hostname -I | awk '{print $1}'):$PORT/visualization.html"
echo ""
echo "Чтобы узнать ваш IP адрес, выполните: ifconfig | grep 'inet '"
echo ""
echo "Нажмите Ctrl+C для остановки сервера"
echo ""

cd "$DIR"
python3 -m http.server $PORT --bind 0.0.0.0
