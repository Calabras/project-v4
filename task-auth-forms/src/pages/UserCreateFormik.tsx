import { Container, Typography, Snackbar } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useCreateUser } from '@/entities/user/api';
import UserFormFormik from '@/features/user-crud/UserFormFormik';
import { useState } from 'react';
import type { InferType } from 'yup';
import { yupSchemaCreate } from '@/entities/user/model';
import { normalizeBirthDate } from '@/shared/lib/normalize';

type FormValues = InferType<typeof yupSchemaCreate>;

export default function UserCreateFormikPage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();
  const [snackOpen, setSnackOpen] = useState(false);

  const handleSubmit = (data: FormValues) => {
    const { passwordConfirm, employment, ...rest } = data;
    const apiData = {
      ...rest,
      birthDate: normalizeBirthDate(data.birthDate),
      employment: typeof employment === 'string' ? employment : '', // фикс employment
    };

    createUser.mutate(apiData, {
      onSuccess: () => {
        setSnackOpen(true);
      },
      onError: (err) => {
        console.error('[CREATE ERROR]', err);
      },
    });
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Создать пользователя (Formik)
      </Typography>
      <UserFormFormik onSubmit={handleSubmit} />
      <Snackbar
        open={snackOpen}
        autoHideDuration={3000}
        onClose={() => {
          setSnackOpen(false);
          navigate('/');
        }}
        message="Пользователь успешно создан (Formik)"
      />
    </Container>
  );
}
