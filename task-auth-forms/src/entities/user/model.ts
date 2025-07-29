import * as yup from 'yup';

export interface User {
  id: string;
  email: string;
  name: string;
  surName: string;
  fullName: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;
}

const toUndef = (v: unknown) =>
  typeof v === 'string' && v.trim() === '' ? undefined : v;

const base = {
  name: yup.string().max(64, 'Максимум 64 символа').required('Имя обязательно'),
  surName: yup.string().max(64, 'Максимум 64 символа').required('Фамилия обязательна'),
  fullName: yup.string().max(130, 'Максимум 130 символов').required('Полное имя обязательно'),
  email: yup
    .string()
    .matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, 'Введите корректный email (например, user@mail.ru)')
    .required('Email обязателен'),
  birthDate: yup.string().transform(toUndef).optional(),
  telephone: yup.string().transform(toUndef).matches(/^\+\d{11}$/, 'Телефон в формате +79991231231').optional(),
  employment: yup.string().transform(toUndef).optional(),
  userAgreement: yup.bool().oneOf([true], 'Необходимо согласие').required(),
};

// Создание: пароль обязателен
export const yupSchemaCreate = yup.object({
  ...base,
  password: yup
    .string()
    .min(8, 'Минимум 8 символов')
    .matches(/[A-Z]/, 'Нужна хотя бы одна заглавная буква')
    .matches(/[a-z]/, 'Нужна хотя бы одна строчная буква')
    .matches(/[0-9]/, 'Нужна хотя бы одна цифра')
    .matches(/[^A-Za-z0-9]/, 'Нужен хотя бы один спецсимвол')
    .required('Пароль обязателен'),
  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтверждение обязательно'),
});

// Редактирование: пароль не обязателен, но если указан — проверяем
export const yupSchemaEdit = yup.object({
  ...base,
  password: yup.string().transform(toUndef).optional(),
  passwordConfirm: yup
    .string()
    .transform(toUndef)
    .oneOf([yup.ref('password'), undefined], 'Пароли не совпадают')
    .optional(),
});
