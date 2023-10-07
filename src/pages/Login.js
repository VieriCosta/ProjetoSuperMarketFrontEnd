import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import { Link, useNavigate } from 'react-router-dom';
import httpService from '../services/httpService';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import Paper from '@mui/material/Paper'; // Importe o componente Paper
import '../styles/login.css'; // Importe o novo arquivo CSS
import teal from '@mui/material/colors/teal';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Login = () => {
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate(); // Hook de roteamento para navegar entre páginas
  // Função para lidar com o envio do formulário
  const handleSubmit = async e => {
    if (!isClicked) setIsClicked(true);
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = {};
    for (const [key, value] of formData) {
      data[key] = value;
    }

    try {
      // Envia a solicitação para fazer login usando os dados do formulário

      const response = await httpService.login(data);
      const result = await response.json();
      setTimeout(() => {
        if (result.message) {
          setIsClicked(false);
        }
      }, 8000);

      if (result.message) {
        return toast(result.message);
      }
      // Armazena o nome do usuário e o token de acesso no armazenamento local
      localStorage.setItem('usuario', result['EmployeeData']);
      localStorage.setItem('token', `Bearer ${result['Access-Token']}`);
      // Redireciona para a página de home após o login bem-sucedido
      navigate('/home');
    } catch (err) {
      // Lida com erros desconhecidos
      toast('Erro desconhecido');
    }
  };

  return (
    <>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: '#009688', // Define a cor de fundo desejada
            borderRadius: 8, // Define o raio de borda arredondada
            padding: '15px' // Define o espaçamento interno
          }}
        >
          <Paper elevation={3} sx={{ margin: '15px', padding: '25px', borderRadius: 8 }}>
            <Avatar sx={{ bgcolor: teal[500] }}>
              <AccountCircleIcon />
            </Avatar>
            <Typography variant="h5">Sign in</Typography>

            <Box
              component="form"
              onSubmit={handleSubmit}
              width="100%" // Largura total do Paper
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <TextField
                required
                fullWidth
                margin="normal"
                name="cpf"
                label="Insira o CPF"
                className="textField" // Adicione a classe para estilização
              />
              <TextField
                required
                fullWidth
                margin="normal"
                name="password"
                type="password"
                label="Password"
                className="textField" // Adicione a classe para estilização
              />
              <Button
                disabled={isClicked}
                type="submit"
                fullWidth
                sx={{ bgcolor: teal[500], mt: 2 }}
                variant="contained"
                className="button" // Adicione a classe para estilização
              >
                {' '}
                Send{' '}
              </Button>
              <Grid sx={{ mt: 2 }} container>
                <Grid item xs={8}>
                  <Link to="/signup" className="link">
                    {' '}
                    Don't have an account? Create Account{' '}
                  </Link>
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

export default Login;
