import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import teal from '@mui/material/colors/teal';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/signup.css'; // Importa um arquivo de estilo externo

const SignUp = () => {
  const navigate = useNavigate()// Hook de roteamento para navegar entre páginas
  // Função para lidar com o envio do formulário
  const handleSubmit = async e => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const data = {}
    for (const [key, value] of formData) {
      data[key] = value
      console.log(key, value)
    }

    try {
      // Envia a solicitação para criar um novo usuário usando os dados do formulário
      const response = await httpService.createUser(data);
      const result = await response.json();
      if (result.message) {
        //Exibe uma mensagem se houver um erro ou mensagem de erro retornada do servidor
        return toast(result.message);
      }
      //Armazena o token de acesso no armazenamento local
      localStorage.setItem('usuario', result['EmployeeData']);
      localStorage.setItem('token', 'Bearer' + " " + result['Access-Token']);
      //Redireciona para a página de painel após o registro bem - sucedido
      navigate('/home');
    } catch (err) {
      //Lida com erros desconhecidos
      toast('Erro desconhecido');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#009688', // Define a cor de fundo desejada
            borderRadius: 8, // Define o raio de borda arredondada
            padding: '16px' // Define o espaçamento interno
          }}
        >
          <Paper elevation={3} sx={{ margin: '15px', padding: '25px', borderRadius: 8 }}>
            <Avatar sx={{ bgcolor: teal[500] }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography variant="h5" className="signup-title">
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              width="100%"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              className="signup-form"
            >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="given-name"
                    name="name"
                    required
                    fullWidth
                    id="name"
                    label="Name"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="lastName"
                    label="Last Name"
                    id="lastName"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name='cpf'
                    label="CPF"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="email"
                    label="Email"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                onSubmit={handleSubmit}
                fullWidth
                variant="contained"
                sx={{ bgcolor: teal[500], mt: 2 }}
                className="signup-button"
              >
                Sign Up
              </Button>
              <Grid container justifyContent="flex-end" className="signup-link">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </Box>
      </Container>
      <ToastContainer /> {/* Componente para exibir notificações de toasts */}
    </>
  );
};

export default SignUp;
