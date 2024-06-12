import { createBrowserRouter } from 'react-router-dom';
import { AuthLayout } from '@/components/layout/auth';
import { MainLayout } from '@/components/layout/main';
import { Home } from './home';
import { Login } from './login';
import { Register } from './register';
import { NotFound } from './notfound';
import { DetailThread } from './detailthread';
import { ThreadNew } from './threadnew';
import { ProtectedRoute } from './protectedroute';

export const router = createBrowserRouter([
  { path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'nr/:category', index: true, element: <Home /> },
      {
        path: 'threads/new',
        element: (
          <ProtectedRoute>
            <ThreadNew />
          </ProtectedRoute>
        ),
      },
      { path: 'threads/:threadId', element: <DetailThread /> },
    ],
  },
  { path: '/',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },
  { path: '*', element: <NotFound /> },
]);
