import './App.css';
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
        <p className='text-center py-4'>
          © 2023 NexusBlog. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
