import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { api } from '@/shared/api/axios';
import type { User } from './model';

export const useUsers = () =>
  useQuery({
    queryKey: ['users'],
    queryFn: () => api.get<User[]>('/v1/users').then(r => r.data),
  });

export const useUser = (id: string) =>
  useQuery({
    queryKey: ['user', id],
    enabled: !!id,
    queryFn: () => api.get<User>(`/v1/users/${id}`).then(r => r.data),
  });

// Тип payload для создания (то, что реально ждёт бэк)
export type CreatePayload = {
  name: string;
  surName: string;
  fullName: string;
  email: string;
  password: string;
  birthDate?: string;
  telephone?: string;
  employment?: string;     // сервер хочет строку
  userAgreement: boolean;
};

export const useCreateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: CreatePayload & { passwordConfirm?: string }) => {
      const { passwordConfirm, employment, ...rest } = data;
      return api
        .post<User>('/v1/users', {
          ...rest,
          employment: typeof employment === 'string' ? employment : '', // <-- фикс: всегда строка
        })
        .then(r => r.data);
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};

type UpdatePayload = Partial<
  Pick<CreatePayload, 'name' | 'surName' | 'fullName' | 'birthDate' | 'telephone' | 'employment'> &
  { password?: string }
>;

export const useUpdateUser = () => {
  const qc = useQueryClient();
  return useMutation({
    // forms-server ожидает PATCH, не PUT
    mutationFn: ({ id, data }: { id: string; data: UpdatePayload }) =>
      api.patch<User>(`/v1/users/${id}`, data).then(r => r.data),
    onSuccess: (_data, { id }) => {
      qc.invalidateQueries({ queryKey: ['users'] });
      qc.invalidateQueries({ queryKey: ['user', id] });
    },
  });
};

export const useDeleteUser = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => api.delete(`/v1/users/${id}`).then(r => r.data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['users'] }),
  });
};
