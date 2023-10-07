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
import { Link as RouterLink, useNavigate } from 'react-router-dom';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/promotion.css'; // Importe o CSS
import Grid from '@mui/material/Grid';

const CustomLink = React.forwardRef((props, ref) => <RouterLink innerRef={ref} {...props} />);

const Promotion = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [products, setProducts] = useState([]);
  const [editingProductIndex, setEditingProductIndex] = useState(null);
  const navigate = useNavigate();

  if (!localStorage.getItem('token') || !localStorage.getItem('usuario')) {
    window.location.reload();
    navigate('/login');
  }

  const handleUpdatePrice = productIndex => {
    setEditingProductIndex(productIndex);
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
      console.log(key, value);
    }
    try {
      const value = localStorage.getItem('token');
      const response = await httpService.createPromotion(data);
      const result = await response.json();
      if (result.message) {
        return toast(result.message);
      }
      navigate('/home');
    } catch (err) {
      toast('Erro desconhecido');
    }
  };

  const drawerWidth = 240;

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await httpService.getProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    };

    fetchProducts();
  }, []);

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
              <ListItemText primary="UpdateProduct" />
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
          <Container onSubmit={handleSubmit} component="form" maxWidth="lg" sx={{ mt: 10, mb: 10 }}>
            <Grid container spacing={2}>
              {products.map((product, index) => (
                <Grid item xs={12} sm={6} md={4} key={product.id}>
                  <Card style={{ marginBottom: '25px', width: '300px' }}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        Informações do Produto:
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Código: {product.cod}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Tipo: {product.type}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Item: {product.item}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Quantidade: {product.amount}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Valor: {product.value}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        <img
                          src={product.urlImg}
                          alt="Imagem do Produto"
                          style={{ width: '150px', height: '150px' }}
                        />
                      </Typography>
                    </CardContent>
                    <CardActions>
                      {editingProductIndex === index ? (
                        <div>
                          <TextField
                            required
                            InputLabelProps={{ shrink: true }}
                            label="Novo Preço"
                            fullWidth
                            margin="normal"
                            name="value"
                          />
                          <input type="hidden" name="id" value={product._id} />
                          <Button variant="contained" type="submit" onSubmit={handleSubmit}>
                            Salvar
                          </Button>
                        </div>
                      ) : (
                        <Button variant="contained" onClick={() => handleUpdatePrice(index)}>
                          Alterar Preço
                        </Button>
                      )}
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Promotion;
