import { useUsers, useDeleteUser } from '@/entities/user/api';
import UserTable from '@/entities/user/ui/UserTable';

export default function UsersPage() {
  const { data = [], isLoading } = useUsers();
  const del = useDeleteUser();

  if (isLoading) return null;
  return <UserTable users={data} onDelete={(id) => del.mutate(id)} />;
}