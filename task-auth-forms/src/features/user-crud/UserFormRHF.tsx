// src/features/user-crud/UserFormRHF.tsx
import React, { useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import type { AnyObjectSchema, InferType } from 'yup';
import {
  TextField,
  Button,
  Stack,
  Checkbox,
  FormControlLabel
} from '@mui/material';
import { Controller, useForm, type SubmitHandler } from 'react-hook-form';
import { yupSchemaCreate } from '@/entities/user/model';

type FormValues = InferType<typeof yupSchemaCreate>;

interface Props {
  defaultValues?: Partial<FormValues>;
  onSubmit: SubmitHandler<FormValues>;
  onCancel?: () => void;
  readOnly?: Partial<Record<keyof FormValues, boolean>>;
  schema?: AnyObjectSchema;          // можно подменить на yupSchemaEdit
  mode?: 'create' | 'edit';          // чтобы показывать/скрывать пароль и чекбокс
}

const defaults: FormValues = {
  name: '',
  surName: '',
  fullName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  birthDate: undefined,
  userAgreement: false,
};

export default function UserFormRHF({
  defaultValues,
  onSubmit,
  onCancel,
  readOnly = {},
  schema,
  mode = 'create',
}: Props) {
  const activeSchema = schema ?? yupSchemaCreate;

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, dirtyFields },
  } = useForm<FormValues>({
    defaultValues: { ...defaults, ...defaultValues },
    resolver: yupResolver(activeSchema),
  });

  const name = watch('name');
  const surName = watch('surName');

  // автозаполнение fullName БЕЗ пробела
  useEffect(() => {
    if (!dirtyFields.fullName) {
      setValue('fullName', `${surName ?? ''}${name ?? ''}`);
    }
  }, [name, surName, dirtyFields.fullName, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit, (e) => console.error('[VALIDATION ERROR]', e))}>
      <Stack spacing={2} sx={{ maxWidth: 500 }}>
        <Controller
          name="name"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Имя" error={!!errors.name} helperText={errors.name?.message} disabled={readOnly.name} />
          )}
        />

        <Controller
          name="surName"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Фамилия" error={!!errors.surName} helperText={errors.surName?.message} disabled={readOnly.surName} />
          )}
        />

        <Controller
          name="fullName"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Полное имя" value={field.value ?? ''} error={!!errors.fullName} helperText={errors.fullName?.message} disabled={readOnly.fullName} />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField {...field} label="Email" type="email" error={!!errors.email} helperText={errors.email?.message} disabled={readOnly.email} />
          )}
        />

        {mode === 'create' && (
          <Stack direction="row" spacing={2}>
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="password" label="Пароль" error={!!errors.password} helperText={errors.password?.message} fullWidth disabled={readOnly.password} />
              )}
            />
            <Controller
              name="passwordConfirm"
              control={control}
              render={({ field }) => (
                <TextField {...field} type="password" label="Подтверждение" error={!!errors.passwordConfirm} helperText={errors.passwordConfirm?.message} fullWidth disabled={readOnly.passwordConfirm} />
              )}
            />
          </Stack>
        )}

        <Controller
          name="birthDate"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              label="Дата рождения"
              type="date"
              InputLabelProps={{ shrink: true }}
              error={!!errors.birthDate}
              helperText={errors.birthDate?.message}
              value={field.value || ''}
              disabled={readOnly.birthDate}
            />
          )}
        />

        {mode === 'create' && (
          <>
            <Controller
              name="userAgreement"
              control={control}
              render={({ field }) => (
                <FormControlLabel
                  control={<Checkbox {...field} checked={field.value ?? false} />}
                  label="Я принимаю пользовательское соглашение"
                  disabled={readOnly.userAgreement}
                />
              )}
            />
            {errors.userAgreement && (
              <div style={{ color: 'red', fontSize: '0.75rem', marginTop: '-8px' }}>
                {errors.userAgreement.message}
              </div>
            )}
          </>
        )}

        <Stack direction="row" spacing={2}>
          {onCancel && (
            <Button variant="outlined" onClick={onCancel}>
              Отмена
            </Button>
          )}
          <Button variant="contained" type="submit">
            Сохранить
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}
