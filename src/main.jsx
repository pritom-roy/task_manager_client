import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from './context/AuthProvider';
import TaskManager from './home/TaskManager';
import PrivateRoute from './router/PrivateRoute';
import Login from './authentication/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <PrivateRoute><TaskManager /></PrivateRoute>,
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
