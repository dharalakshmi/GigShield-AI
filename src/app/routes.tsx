import { createBrowserRouter } from 'react-router';
import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Claims from './pages/Claims';
import Profile from './pages/Profile';
import { UserProvider } from './context/UserContext';

// Layout wrapper with UserProvider
const Layout = ({ children }: { children: React.ReactNode }) => {
  return <UserProvider>{children}</UserProvider>;
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout><Landing /></Layout>,
  },
  {
    path: '/onboarding',
    element: <Layout><Onboarding /></Layout>,
  },
  {
    path: '/dashboard',
    element: <Layout><Dashboard /></Layout>,
  },
  {
    path: '/claims',
    element: <Layout><Claims /></Layout>,
  },
  {
    path: '/profile',
    element: <Layout><Profile /></Layout>,
  },
]);