import { useQuery } from '@tanstack/react-query';
import { api } from '@/shared/api/axios';
import { User } from '@/entities/user/model';

export const useCurrentUser = () =>
  useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<User>('/v1/auth/me').then(r => r.data),
    retry: false
  });
