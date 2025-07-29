// src/entities/user/ui/UserTable.tsx
import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  DialogContentText
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { User } from '../model';
import { useNavigate } from 'react-router-dom';

interface Props {
  users: User[];
  onDelete: (id: string) => void;
}

export default function UserTable({ users, onDelete }: Props) {
  const navigate = useNavigate();
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);

  const handleEdit = (id: string) => {
    navigate(`/user/${id}`);
  };

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (userToDelete) {
      onDelete(userToDelete.id);
      setDeleteDialogOpen(false);
      setUserToDelete(null);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setUserToDelete(null);
  };

  const isAdmin = (user: User) => user.email === 'admin@inno.tech';

  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Имя</TableCell>
              <TableCell>Фамилия</TableCell>
              <TableCell>Полное имя</TableCell>
              <TableCell>Дата рождения</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.surName}</TableCell>
                <TableCell>{user.fullName}</TableCell>
                <TableCell>{user.birthDate ? user.birthDate.slice(0, 10) : '—'}</TableCell>
                <TableCell>
                  <IconButton 
                    onClick={() => handleEdit(user.id)}
                    color="primary"
                    size="small"
                  >
                    <EditIcon />
                  </IconButton>
                  {!isAdmin(user) && (
                    <IconButton 
                      onClick={() => handleDeleteClick(user)}
                      color="error"
                      size="small"
                    >
                      <DeleteIcon />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Диалог подтверждения удаления */}
      <Dialog
        open={deleteDialogOpen}
        onClose={handleDeleteCancel}
      >
        <DialogTitle>Подтверждение удаления</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Вы уверены, что хотите удалить пользователя "{userToDelete?.fullName}" ({userToDelete?.email})?
            Это действие нельзя отменить.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteCancel} color="primary">
            Нет
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" autoFocus>
            Да, удалить
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}