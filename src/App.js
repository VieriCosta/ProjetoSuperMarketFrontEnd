import { RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Home from './pages/Home';
import CreateProduct from './pages/CreateProduct';
import Promotion from './pages/Promotion';

function App() {
  const defaultRouter = createBrowserRouter([
    {
      path: '/', // Mantenha a rota raiz como '/'
      element: <Navigate to="/login" /> // Redireciona para /login
    },
    {
      path: '/login',
      element: <Login />
    },
    {
      path: '/home',
      element: <Home />
    },

    {
      path: '/signup',
      element: <Signup />
    },
    { path: '/createproduct', element: <CreateProduct /> },
    { path: '/promotion', element: <Promotion /> }
  ]);

  return (
    <div className="App">
      <RouterProvider router={defaultRouter} />
    </div>
  );
}

export default App;