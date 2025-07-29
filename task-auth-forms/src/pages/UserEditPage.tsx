// src/pages/UserEditPage.tsx
import { useParams, useNavigate } from 'react-router-dom';
import { useUser, useUpdateUser } from '@/entities/user/api';
import UserFormRHF from '@/features/user-crud/UserFormRHF';
import { Container, Typography, CircularProgress, Snackbar } from '@mui/material';
import { useState } from 'react';
import { yupSchemaEdit } from '@/entities/user/model';
import { normalizeBirthDate } from '@/shared/lib/normalize';
import { getEnumValues } from 'node_modules/zod/v4/core/util';

export default function UserEditPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: user, isLoading } = useUser(id!);
  const updateUser = useUpdateUser();
  const [snackOpen, setSnackOpen] = useState(false);

  if (isLoading) {
    return (
      <Container sx={{ py: 4, display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!user) {
    return (
      <Container sx={{ py: 4 }}>
        <Typography variant="h5" color="error">
          Пользователь не найден
        </Typography>
      </Container>
    );
  }

  const handleSubmit = (values: any) => {
    const payload: any = {
      name: values.name,
      surName: values.surName,
      fullName: values.fullName,
      birthDate: values.birthDate || undefined,
      telephone: values.telephone || undefined,
      employment: typeof values.employment === 'string' ? values.employment : '',
    };

    if (values.password) {
      payload.password = values.password;
    }

    updateUser.mutate(
      { id: user.id, data: payload },
      {
        onSuccess: () => navigate('/'),
        onError: (err: any) => {
          console.error('[UPDATE ERROR]', err);
          console.error('[UPDATE ERROR] message:', err.response?.data?.message);
        }
      }
    );
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Редактировать пользователя
      </Typography>

      <UserFormRHF
        onSubmit={handleSubmit}
        mode="edit"
        schema={yupSchemaEdit}
        defaultValues={{
          name: user.name,
          surName: user.surName,
          fullName: user.fullName,
          email: user.email,
          password: '',
          passwordConfirm: '',
          birthDate: user.birthDate ? user.birthDate.slice(0, 10) : '',
          telephone: user.telephone || '',
          employment: user.employment || '',
          userAgreement: true,
        }}
        readOnly={{
          email: true,
          userAgreement: true,
        }}
      />

      <Snackbar
        open={snackOpen}
        autoHideDuration={2000}
        onClose={() => {
          setSnackOpen(false);
          navigate('/');
        }}
        message="Изменения сохранены"
      />
    </Container>
  );
}
