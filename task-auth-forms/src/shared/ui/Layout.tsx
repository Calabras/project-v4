// src/app/Layout.tsx
import { Outlet } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItemButton,
  CssBaseline,
  Box
} from '@mui/material';
import { Link } from 'react-router-dom';

const drawerWidth = 220;

export default function Layout() {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Header */}
      <AppBar position="fixed" sx={{ zIndex: 1300 }}>
        <Toolbar>
          <Typography variant="h6">Task Auth Forms</Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' }
        }}
      >
        <Toolbar /> {/* spacer равный AppBar */}
        <List>
          <ListItemButton
            component={Link}
            to="/"
            sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            Главная (таблица пользователей)
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/user/create"
            sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            Создать пользователя (RHF метод)
          </ListItemButton>

          <ListItemButton
            component={Link}
            to="/user/create-formik"
            sx={{ whiteSpace: 'normal', wordBreak: 'break-word' }}
          >
            Создать пользователя (Formik метод)
          </ListItemButton>
        </List>

      </Drawer>

      {/* Контент */}
      <Box component="main" sx={{ flexGrow: 1, p: 3, ml: `${drawerWidth}px` }}>
        <Toolbar /> {/* spacer */}
        <Outlet />
      </Box>
    </Box>
  );
}