import { Container, Typography } from '@mui/material';
import LoginForm from '@/features/auth/LoginForm';

export default function LoginPage() {
  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h5" gutterBottom>
        Вход
      </Typography>
      <LoginForm />
    </Container>
  );
}