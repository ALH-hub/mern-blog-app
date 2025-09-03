import './App.css';
import NavBar from './components/NavBar.tsx';
import Home from './pages/Home.tsx';

function App() {
  return (
    <div className='bg-gray-100'>
      <NavBar />
      <Home />
    </div>
  );
}

export default App;
