import { createBrowserRouter } from 'react-router';
import Home from './pages/Home';
import Discover from './pages/Discover';
import About from './pages/About';
import Categories from './pages/Categories';
import Contact from './pages/Contact';

const routes = createBrowserRouter([
  {
    path: '/',
    Component: Home,
  },
  {
    path: '/discover',
    Component: Discover,
  },
  {
    path: '/categories',
    Component: Categories,
  },
  {
    path: '/about',
    Component: About,
  },
  {
    path: '/contact',
    Component: Contact,
  },
]);

export default routes;
