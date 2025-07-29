import { Container, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/entities/user/api';
import UserFormRHF from '@/features/user-crud/UserFormRHF';
import { useState } from 'react';
import type { InferType } from 'yup';
import { yupSchemaCreate } from '@/entities/user/model';
import { normalizeBirthDate } from '@/shared/lib/normalize';

type FormValues = InferType<typeof yupSchemaCreate>;

export default function UserCreatePage() {
  const nav = useNavigate();
  const create = useCreateUser();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = (data: FormValues) => {
    const { passwordConfirm, employment, ...rest } = data;
    const processedData = {
      ...rest,
      birthDate: normalizeBirthDate(data.birthDate),
      employment: typeof employment === 'string' ? employment : '', // фикс employment
    };

    create.mutate(processedData, {
      onSuccess: () => setSnackOpen(true),
      onError: (err: any) => {
        console.error('[CREATE ERROR]', err);
        console.error('[CREATE ERROR] Response data:', err.response?.data);
      },
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Создать пользователя (RHF)
      </Typography>
      <UserFormRHF onSubmit={handleSubmit} mode="create" />
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackOpen(false);
          nav('/');
        }}
        message="Пользователь успешно создан (RHF)"
      />
    </Container>
  );
}
