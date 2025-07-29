// src/features/user-crud/UserFormFormik.tsx
import React from 'react';
import {
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel,
  FormHelperText
} from '@mui/material';
import { Formik, Form, Field, FieldProps } from 'formik';
import { yupSchemaCreate } from '@/entities/user/model';
import * as yup from 'yup';

type FormValues = yup.InferType<typeof yupSchemaCreate>;

const initialValues: FormValues = {
  name: '',
  surName: '',
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthDate: undefined,
  userAgreement: false,
};

interface Props {
  onSubmit: (values: FormValues) => void;
  defaultValues?: Partial<FormValues>;
}

export default function UserFormFormik({ onSubmit, defaultValues }: Props) {
  const formInitialValues = { ...initialValues, ...defaultValues };

  return (
    <Formik
      initialValues={formInitialValues}
      validationSchema={yupSchemaCreate}
      onSubmit={onSubmit}
    >
      {({ values, setFieldValue, errors, touched }) => (
        <Form>
          <Stack spacing={2} sx={{ maxWidth: 500 }}>
            <Field name="name">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Имя"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  onChange={(e) => {
                    const nameValue = e.target.value;
                    setFieldValue('name', nameValue);
                    const autoFullName = `${nameValue}${values.surName}`.trim(); // без пробела
                    if (!values.fullName || values.fullName === `${values.name}${values.surName}`.trim()) {
                      setFieldValue('fullName', autoFullName);
                    }
                  }}
                />
              )}
            </Field>

            <Field name="surName">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Фамилия"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                  onChange={(e) => {
                    const surnameValue = e.target.value;
                    setFieldValue('surName', surnameValue);
                    const autoFullName = `${values.name}${surnameValue}`.trim(); // без пробела
                    if (!values.fullName || values.fullName === `${values.name}${values.surName}`.trim()) {
                      setFieldValue('fullName', autoFullName);
                    }
                  }}
                />
              )}
            </Field>

            <Field name="fullName">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Полное имя"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>

            <Field name="email">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>

            <Stack direction="row" spacing={2}>
              <Field name="password">
                {({ field, meta }: FieldProps) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Пароль"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    fullWidth
                  />
                )}
              </Field>
              <Field name="passwordConfirm">
                {({ field, meta }: FieldProps) => (
                  <TextField
                    {...field}
                    type="password"
                    label="Подтверждение"
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched && meta.error}
                    fullWidth
                  />
                )}
              </Field>
            </Stack>

            <Field name="birthDate">
              {({ field, meta }: FieldProps) => (
                <TextField
                  {...field}
                  label="Дата рождения"
                  type="date"
                  InputLabelProps={{ shrink: true }}
                  value={field.value || ''}  
                  error={meta.touched && !!meta.error}
                  helperText={meta.touched && meta.error}
                />
              )}
            </Field>

            <Field name="userAgreement">
              {({ field }: FieldProps) => (
                <FormControlLabel
                  control={
                    <Checkbox
                      {...field}
                      checked={field.value}
                      onChange={(e) => setFieldValue('userAgreement', e.target.checked)}
                    />
                  }
                  label="Я принимаю пользовательское соглашение"
                />
              )}
            </Field>

            {touched.userAgreement && (errors as any).userAgreement && (
              <FormHelperText error>
                {(errors as any).userAgreement}
              </FormHelperText>
            )}

            <Stack direction="row" spacing={2} justifyContent="flex-start">
              <Button variant="contained" type="submit">
                Сохранить
              </Button>
            </Stack>
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
