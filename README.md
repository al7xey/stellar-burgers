# Stellar Burgers

Веб-приложение для сборки и оформления бургеров с личным кабинетом пользователя и лентой заказов.

## Функциональность

- Сборка бургера в конструкторе с drag-and-drop ингредиентов.
- Просмотр деталей ингредиента в модальном окне и на отдельном роуте.
- Оформление заказа авторизованным пользователем.
- Лента всех заказов (`/feed`) и детали конкретного заказа.
- Личный кабинет пользователя (`/profile`):
  - просмотр и редактирование профиля;
  - история личных заказов (`/profile/orders`).
- Авторизация и восстановление доступа:
  - регистрация;
  - вход;
  - выход;
  - восстановление и сброс пароля.
- Защищённые и гостевые роуты (через `ProtectedRoute`).
- Обновление access-токена через refresh-токен при истечении сессии.

## Стек

- React 18 + TypeScript
- Redux Toolkit
- React Router v6
- Webpack
- Storybook
- Jest + React Testing Library
- Cypress

## Требования

- Node.js 18+
- npm 9+

## Быстрый старт

1. Установить зависимости:

```bash
npm install
```

2. Создать файл `.env` в корне проекта и указать API:

```env
BURGER_API_URL=https://norma.education-services.ru/api
```

3. Запустить проект в режиме разработки:

```bash
npm start
```

После запуска приложение будет доступно на `http://localhost:8080` (порт по умолчанию для `webpack-dev-server`).

## Скрипты

- `npm start` — запуск dev-сервера.
- `npm run lint` — проверка ESLint.
- `npm run lint:fix` — автоисправление ESLint-ошибок.
- `npm run format` — форматирование `src` через Prettier.
- `npm test` — запуск unit-тестов (Jest).
- `npm run test:watch` — Jest в watch-режиме.
- `npm run test:coverage` — отчёт покрытия тестами.
- `npm run cypress:open` — запуск Cypress UI.
- `npm run cypress:run` — запуск e2e-тестов в headless-режиме.
- `npm run storybook` — запуск Storybook.
- `npm run build-storybook` — сборка Storybook.

## Структура проекта

- `src/components` — контейнерные и презентационные React-компоненты.
- `src/pages` — страницы приложения.
- `src/services` — Redux store и слайсы состояния.
- `src/utils` — API-клиент, типы и вспомогательные утилиты.
- `src/stories` — Storybook-истории компонентов.
- `cypress` — e2e-тесты и конфигурация Cypress.

## Тестирование

Проект покрыт:

- unit-тестами (Jest + React Testing Library);
- e2e-тестами (Cypress);
- визуальной изоляцией компонентов через Storybook.

Рекомендуемый порядок локальной проверки перед коммитом:

1. `npm run lint`
2. `npm test`
3. `npm run cypress:run` (по необходимости)
