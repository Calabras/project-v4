# Task Auth Forms (Vite + React + TypeScript + MUI + RHF/Formik)

Учебный проект по работе с формами и аутентификацией.  
Клиент на Vite/React (TS) с двумя реализациями форм (React Hook Form + Zod и Formik + Yup).  
Сервер — готовый NestJS backend из репозитория **Pardeg/forms-server** (cookie-based auth).

## Стек

- **Frontend:** Vite, React 18, TypeScript
- **UI:** Material UI (MUI)
- **Routing:** React Router v6
- **Data:** @tanstack/react-query
- **Forms:**
  - RHF (+ Zod) — `/user/create`
  - Formik (+ Yup) — `/user/create-formik`
- **HTTP:** Axios (`withCredentials: true`)
- **Backend:** NestJS (из репо `Pardeg/forms-server`), JWT в **HttpOnly cookie**

## Фичи по ТЗ

- Лейаут: фиксированный хедер + левое меню (везде, кроме `/login`).
- Маршруты:
  - `/login` — логин (email/pass), токен в cookie.
  - `/` — главная с таблицей пользователей (обязательные колонки: id, email).
  - `/user/create` — создание пользователя (RHF).
  - `/user/create-formik` — создание пользователя (Formik).
  - `/user/edit/:id` — редактирование пользователя:
    - **email и пароль не редактируются** (по ТЗ).
    - остальные поля редактируемые.
- Валидация:
  - **Email** — валидный формат.
  - **Пароль** — минимум 8 символов, латинские строчные/заглавные буквы, цифры, спецсимвол.
  - **Подтверждение пароля** совпадает с паролем (в create-формах).
  - **Полное имя** заполняется автоматически при вводе имени/фамилии:
    - RHF: без пробела (`surName + name`), можно отредактировать вручную.
    - Formik: без пробела по умолчанию, редактируемо.
  - **Согласие (checkbox)** — обязательно.
- CRUD:
  - Создание пользователя (после успеха — snackbar).
  - Удаление пользователя из таблицы (кроме `admin@inno.tech`).
  - Редактирование пользователя (кнопка-карандаш → `/user/edit/:id`).

## Требования backend (по умолчанию)

- Репозиторий: https://github.com/Pardeg/forms-server
- Swagger: `http://localhost:4000/api`
- Важное:
  - **Аутентификация через cookie**
  - **Эндпоинты**:
    - `POST /api/v1/auth/login`
    - `GET  /api/v1/auth/me`
    - `GET  /api/v1/users`
    - `POST /api/v1/users`
    - `PATCH /api/v1/users/:id`
    - `DELETE /api/v1/users/:id`
  - Тестовая учётка: **email** `admin@inno.tech`, **password** `admin`.

## Установка и запуск

### 1) Бэкенд

```bash
#установите зависимости (в каталоге forms-server)
npm i
npm run start:dev
# откроется http://localhost:4000
```
### 1) Фронтенд

```bash
# в каталоге клиента
npm i
npm run dev
# откроется http://localhost:5173
```