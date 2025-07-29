import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from '@/shared/ui/Layout';
import RequireAuth from '@/features/auth/RequireAuth';
import UsersPage from '@/pages/UsersPage';
import UserCreatePage from '@/pages/UserCreatePage';
import UserCreateFormik from '@/pages/UserCreateFormik';
import LoginPage from '@/pages/LoginPage';
import UserEditPage from '@/pages/UserEditPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<RequireAuth />}>
        <Route element={<Layout />}>
          <Route path="/" element={<UsersPage />} />
          <Route path="/user/:id" element={<UserEditPage />} />
          <Route path="/user/create" element={<UserCreatePage />} />
          <Route path="/user/create-formik" element={<UserCreateFormik />} />
          {/* редактирование по id можно добавить позже */}
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}