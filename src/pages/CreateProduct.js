import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Avatar from '@mui/material/Avatar';
import { Link as RouterLink } from 'react-router-dom';
import httpService from '../services/httpService';
import TextField from '@mui/material/TextField';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LogoutIcon from '@mui/icons-material/Logout';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import teal from '@mui/material/colors/teal';
import pink from '@mui/material/colors/pink';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import HomeIcon from '@mui/icons-material/Home';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const CreateProduct = () => {
  const navigate = useNavigate();
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const value = localStorage.getItem('usuario');
        const resultado = await httpService.getEmployee({ value });

        if (!resultado) {
          navigate('/login');
        } else if (resultado.message) {
          navigate('/login');
        }
      } catch (error) {
        navigate('/login');
      }
    };

    fetchEmployee();
  }, []);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }
    try {
      const valor = await httpService.createProduct(data);
      const valoresult = await valor.json();
      if (valoresult.message) {
        toast(valoresult.message);
      }
      toast(valoresult.Confirme);
      return navigate('/home');
    } catch (error) {
      console.error('Erro ao criar o produto:', error);
      toast('Erro ao criar o produto.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  const drawerWidth = 240;

  const AppBar = styled(MuiAppBar, {
    shouldForwardProp: prop => prop !== 'open'
  })(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }));

  const Drawer = styled(MuiDrawer, {
    shouldForwardProp: prop => prop !== 'open'
  })(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  }));

  const customTheme = createTheme({
    palette: {
      primary: {
        main: teal[500]
      },
      secondary: {
        main: pink[500]
      }
    }
  });

  const toggleDrawer = () => {
    setOpenDrawer(!openDrawer);
  };

  return (
    <ThemeProvider theme={customTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="absolute" open={openDrawer}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: '36px'
              }}
            >
              {openDrawer ? <ChevronLeftIcon /> : <MenuIcon />}
            </IconButton>
            <Typography component="h1" variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
              SuperMarket
            </Typography>
            <IconButton color="inherit">
              <PersonIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={openDrawer}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1]
            }}
          ></Toolbar>
          <Divider />
          <List component="nav">
            <ListItemButton component={CustomLink} to="/home" className="home-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <HomeIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </List>
          <List component="nav">
            <ListItemButton
              component={CustomLink}
              to="/createProduct"
              className="create-product-link"
            >
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <AddCircleOutlineIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="CreateProduct" />
            </ListItemButton>
          </List>
          <List component="nav">
            <ListItemButton component={CustomLink} to="/promotion" className="promotion-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <MonetizationOnIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Promotion" />
            </ListItemButton>
          </List>
          <List component="nav">
            <ListItemButton onClick={logout} className="login-link">
              <ListItemIcon>
                <Avatar sx={{ m: 0.1, bgcolor: 'secondary.main' }}>
                  <LogoutIcon />
                </Avatar>
              </ListItemIcon>
              <ListItemText primary="Logout" />
            </ListItemButton>
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: theme =>
              theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[900],
            flexGrow: 1,
            height: '100vh',
            overflow: 'auto'
          }}
        >
          <Toolbar />
          <Container onSubmit={handleCreateProduct} component="form" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
            <Card>
              <CardContent>
                <Typography variant="h5" component="div">
                  Criar Novo Produto
                </Typography>
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Código"
                  name='cod'
                  fullWidth
                  margin="normal"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Tipo"
                  name='type'
                  fullWidth
                  margin="normal"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Item"
                  name='item'
                  fullWidth
                  margin="normal"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  name='amount'
                  label="Quantidade"
                  fullWidth
                  margin="normal"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="Valor"
                  name='value'
                  fullWidth
                  margin="normal"
                />
                <TextField
                  InputLabelProps={{ shrink: true }}
                  label="URL da Imagem"
                  name='urlImg'
                  fullWidth
                  margin="normal"
                />
              </CardContent>
              <CardActions>
                <Button variant="contained" type='submit' onSubmit={handleCreateProduct}>
                  Criar Produto
                </Button>
              </CardActions>
            </Card>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default CreateProduct;