import './App.css';
import Footer from './components/Footer.tsx';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';

function App() {
  return (
    <div className='bg-gray-100'>
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
