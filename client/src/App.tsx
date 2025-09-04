import './App.css';
import Footer from './components/Footer.tsx';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';
import useThemeStore from './stores/themeStore.ts';

function App() {
  const { isDarkMode } = useThemeStore();
  return (
    <div className={isDarkMode ? 'bg-[#111e2a] text-gray-600' : 'bg-gray-200'}>
      <header>
        <NavBar />
      </header>
      <main>
        <Home />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
