import './App.css';
import Footer from './components/Footer.tsx';
import NavBar from './components/NavBar.tsx';
import About from './pages/About.tsx';
import Categories from './pages/Categories.tsx';
import Contact from './pages/Contact.tsx';
import Discover from './pages/Discover.tsx';
import Home from './pages/Home.tsx';
import Login from './pages/Login.tsx';
import NotFound from './pages/NotFound.tsx';
import Register from './pages/Register.tsx';
import useThemeStore from './stores/themeStore.ts';
import { Outlet, createBrowserRouter, RouterProvider } from 'react-router';

const Layout = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <div className={isDarkMode ? 'bg-[#111e2a] text-white' : 'bg-gray-200'}>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

const AuthLayout = () => {
  const { isDarkMode } = useThemeStore();
  return (
    <div className={isDarkMode ? 'bg-[#111e2a] text-white' : 'bg-gray-200'}>
      <div className='w-full max-w-[600px] mx-auto h-screen py-32 flex items-center justify-center'>
        <Outlet />
      </div>
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
      {
        path: '/categories',
        element: <Categories />,
      },
      {
        path: '/contact',
        element: <Contact />,
      },
      {
        path: '/discover',
        element: <Discover />,
      },
    ],
  },

  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'register',
        element: <Register />,
      },
    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
