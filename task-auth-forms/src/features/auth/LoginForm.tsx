import { useState } from 'react';
import { Button, TextField, Stack, Alert } from '@mui/material';
import { api } from '@/shared/api/axios';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

export default function LoginForm() {
  const [email, setEmail] = useState('admin@inno.tech');
  const [password, setPassword] = useState('admin');
  const [error, setError] = useState('');
  const nav = useNavigate();
  const qc = useQueryClient();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/v1/auth/login', { email, password });
      await qc.invalidateQueries({ queryKey: ['me'] });
      nav('/', { replace: true });
    } catch {
      setError('Неверный логин или пароль');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2} sx={{ maxWidth: 300 }}>
        {error && <Alert severity="error">{error}</Alert>}
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Пароль"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Войти
        </Button>
      </Stack>
    </form>
  );
}
