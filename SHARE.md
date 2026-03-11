# Как поделиться сайтом с другом

## 🚀 Вариант 1: Локальная сеть (быстро)

### Шаг 1: Запустите сервер

```bash
cd "/Users/pavelnovak/тестыИИ/discovery"
./share-server.sh
```

Или вручную:
```bash
cd "/Users/pavelnovak/тестыИИ/discovery"
python3 -m http.server 8004 --bind 0.0.0.0
```

### Шаг 2: Узнайте ваш IP адрес

```bash
# На macOS:
ifconfig | grep "inet " | grep -v 127.0.0.1

# Или проще:
ipconfig getifaddr en0
```

### Шаг 3: Друг открывает в браузере

```
http://ВАШ_IP:8004/index.html
```

**Важно:** Вы должны быть в одной сети (Wi-Fi) с другом!

---

## 🌐 Вариант 2: GitHub Pages (бесплатно, доступно везде)

### Шаг 1: Репозиторий на GitHub

Репозиторий уже задан как **`Discovery-in-value`** под пользователем **`jackrescuer-gif`**.

URL репозитория:

```bash
https://github.com/jackrescuer-gif/Discovery-in-value.git
```

Если вы ещё не инициализировали репозиторий локально:

```bash
cd "/Users/pavelnovak/тестыИИ/discovery"
git init
git add .
git commit -m "Initial commit: Discovery process visualization"
git branch -M main
git remote add origin https://github.com/jackrescuer-gif/Discovery-in-value.git
git push -u origin main
```

Если репозиторий уже существует, просто обновляйте:

```bash
cd "/Users/pavelnovak/тестыИИ/discovery"
git add .
git commit -m "Update discovery process site"
git push
```

### Шаг 3: Включите GitHub Pages

1. Зайдите в Settings репозитория `Discovery-in-value`
2. Перейдите в раздел Pages
3. Выберите Source: `main` branch (или `main` / `/root`, если есть выбор папки)
4. Нажмите Save

### Шаг 4: Друг открывает сайт

```text
https://jackrescuer-gif.github.io/Discovery-in-value/index.html
```

---

## 📦 Вариант 3: Облачные сервисы (просто и быстро)

### Netlify Drop (самый простой)

1. Зайдите на https://app.netlify.com/drop
2. Перетащите папку `discovery` в окно браузера
3. Получите ссылку вида: `https://random-name-123.netlify.app/index.html`
4. Поделитесь ссылкой с другом

### Vercel

1. Установите Vercel CLI: `npm i -g vercel`
2. В папке discovery выполните: `vercel`
3. Следуйте инструкциям
4. Получите ссылку и поделитесь

### Surge.sh

1. Установите: `npm install -g surge`
2. В папке discovery выполните: `surge`
3. Введите email и пароль (или создайте аккаунт)
4. Получите ссылку вида: `http://your-name.surge.sh/index.html`

---

## 📧 Вариант 4: Отправить файл напрямую

Если друг находится далеко и нет интернета:

1. Заархивируйте папку `discovery`:
   ```bash
   cd "/Users/pavelnovak/тестыИИ"
   zip -r discovery.zip discovery/
   ```

2. Отправьте архив другу (email, мессенджер, облако)

3. Друг распаковывает и открывает `index.html` в браузере

**Примечание:** Нужен интернет для загрузки библиотеки Mermaid из CDN.

---

## 🔒 Вариант 5: Локальный сервер с туннелем (ngrok)

Для доступа из любой точки мира:

1. Установите ngrok: https://ngrok.com/download
2. Запустите локальный сервер:
   ```bash
   cd "/Users/pavelnovak/тестыИИ/discovery"
   python3 -m http.server 8004
   ```

3. В другом терминале запустите ngrok:
   ```bash
   ngrok http 8004
   ```

4. Скопируйте URL вида `https://xxxx-xx-xx-xx.ngrok.io`
5. Друг открывает: `https://xxxx-xx-xx-xx.ngrok.io/index.html`

---

## ✅ Рекомендации

- **Для быстрого тестирования:** Вариант 1 (локальная сеть)
- **Для постоянного доступа:** Вариант 2 (GitHub Pages)
- **Для одноразового шаринга:** Вариант 3 (Netlify Drop)
- **Для доступа из любой точки:** Вариант 5 (ngrok)

---

## 🛠️ Устранение проблем

### Сервер не запускается
- Проверьте, что порт 8004 свободен
- Попробуйте другой порт: `python3 -m http.server 8080`

### Друг не может подключиться (локальная сеть)
- Проверьте, что вы в одной Wi-Fi сети
- Проверьте firewall настройки
- Убедитесь, что сервер запущен с `--bind 0.0.0.0`

### Диаграммы не отображаются
- Проверьте подключение к интернету (нужен CDN для Mermaid)
- Откройте консоль браузера (F12) для проверки ошибок
