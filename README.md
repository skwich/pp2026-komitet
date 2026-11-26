# Отчётность родительских комитетов

Веб-приложение для учёта сборов, взносов и расходов класса. Казначей ведёт учёт и прикладывает чеки к расходам. Родитель видит свои начисления и взносы, а также общую сводку по расходам класса.

## Архитектура проекта

```mermaid
flowchart LR
    Browser["Браузер"] --> Nginx["Nginx"]
    Nginx -->|Страницы и статика| React["React + TypeScript"]
    Nginx -->|"/api/v1/ и /admin/"| Django["Django + Django REST Framework"]
    Django --> PostgreSQL["PostgreSQL"]
```

React отвечает за экраны, навигацию и состояние интерфейса. Vite используется для разработки и сборки фронтенда. Браузер обращается к API по относительному пути `/api/v1/`. Django валидирует данные, проверяет права доступа и выполняет операции учёта. Для входа через браузер используются сессии Django. Nginx обслуживает фронтенд и направляет запросы к API и панели администратора в Django. Сервисы объединены через Docker Compose.

## Структура репозитория

```text
frontend/
  src/
    main.tsx   # Точка входа React
    app/       # Корневой компонент, маршрутизация и общие макеты страниц
    pages/     # Компоненты экранов и их стили
    assets/    # Изображения и другие ресурсы, импортируемые в компонентах
    features/  # Модули сборов, расходов и отчётов
    shared/    # Общие компоненты и HTTP-клиент
    css/       # Глобальные стили, шрифты и CSS-переменные
    mocks/     # Демонстрационные данные
  package.json        # Зависимости и команды разработки, сборки и линтинга
  package-lock.json   # Точные версии зависимостей для npm ci
  vite.config.ts      # Настройки Vite и плагина React
  Dockerfile          # Образ фронтенда для запуска Vite
backend/
  ...
  Dockerfile
docker-compose.yaml   # Сервисы для разработки
compose.prod.yaml     # Сервисы для рабочего окружения
```

## Локальный запуск через Docker Compose

Конфигурация `docker-compose.yaml` запускает фронтенд на Vite. Выполняйте команды из корня репозитория.

### Windows

Установите и запустите Docker Desktop, затем откройте PowerShell в корне репозитория. [Установка Docker Desktop на Windows](https://docs.docker.com/desktop/setup/install/windows-install/)

```powershell
docker compose version
docker compose up --build
```

### Linux

Установите Docker Engine и плагин Docker Compose для своего дистрибутива. Убедитесь, что Docker запущен, и откройте терминал в корне репозитория. [Установка Docker Engine](https://docs.docker.com/engine/install/) · [Установка плагина Compose](https://docs.docker.com/compose/install/linux/)

```bash
docker compose version
docker compose up --build
```

### Открытие сайта

После запуска Docker Compose перейдите в браузере по адресу [localhost:5173](http://localhost:5173).

### Остановка

Чтобы остановить запуск в активном терминале, нажмите `Ctrl+C`. Чтобы остановить и удалить контейнеры и сеть проекта, выполните из корня репозитория команду, одинаковую для Windows и Linux.

```bash
docker compose down
```

