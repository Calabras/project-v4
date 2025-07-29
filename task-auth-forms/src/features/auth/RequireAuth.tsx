import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from './useCurrentUser';

export default function RequireAuth() {
  const { data, isLoading } = useCurrentUser();
  if (isLoading) return null; // спиннер опц.

  return data ? <Outlet /> : <Navigate to="/login" replace />;
}