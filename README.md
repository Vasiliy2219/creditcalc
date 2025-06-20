# Кредитный калькулятор

Веб-приложение для расчета кредитных платежей с сохранением истории расчетов.

## Требования

- Python 3.7 или выше
- pip (менеджер пакетов Python)

## Установка и запуск

### Windows

1. **Установка зависимостей:**
   ```
   install.bat
   ```

2. **Запуск приложения:**
   ```
   start.bat
   ```

### Альтернативный способ (ручная установка)

1. **Создание виртуального окружения:**
   ```bash
   python -m venv venv
   ```

2. **Активация виртуального окружения:**
   - Windows: `venv\Scripts\activate`
   - Linux/Mac: `source venv/bin/activate`

3. **Установка зависимостей:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Запуск приложения:**
   ```bash
   python app.py
   ```

## 🌐 Размещение в интернете

### Вариант 1: Render.com (Бесплатно)

1. Зарегистрируйтесь на [render.com](https://render.com)
2. Создайте новый Web Service
3. Подключите ваш GitHub репозиторий
4. Render автоматически обнаружит `render.yaml` и развернет приложение
5. Получите URL вида: `https://your-app-name.onrender.com`

### Вариант 2: Railway.app (Бесплатно)

1. Зарегистрируйтесь на [railway.app](https://railway.app)
2. Создайте новый проект
3. Подключите GitHub репозиторий
4. Railway автоматически обнаружит `Procfile` и развернет приложение
5. Получите URL вида: `https://your-app-name.railway.app`

### Вариант 3: Ngrok (Локальный доступ через интернет)

1. Скачайте [ngrok](https://ngrok.com/download)
2. Запустите: `ngrok_setup.bat`
3. Получите временный URL вида: `https://abc123.ngrok.io`

### Вариант 4: VPS сервер

1. Арендуйте VPS (например, на DigitalOcean, Linode)
2. Загрузите файлы проекта на сервер
3. Запустите: `chmod +x deploy_vps.sh && ./deploy_vps.sh`
4. Настройте домен и SSL сертификат

## Использование

После запуска откройте браузер и перейдите по адресу: `http://localhost:5000`

## Функции

- Расчет аннуитетных и дифференцированных платежей
- Сохранение истории расчетов в базе данных
- Современный веб-интерфейс

## Структура проекта

- `app.py` - основной файл Flask-приложения
- `database.py` - модели базы данных
- `templates/` - HTML шаблоны
- `static/` - CSS и JavaScript файлы
- `requirements.txt` - зависимости Python
- `render.yaml` - конфигурация для Render.com
- `Procfile` - конфигурация для Railway/Heroku 