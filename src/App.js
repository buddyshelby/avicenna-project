import './App.css';
import Home from './views/Home'
import Navbar from './components/navbar/Navbar'

function App() {
  return (
    <>
      <Navbar />
      <div id="pages">
        <Home />
      </div>
    </>
  );
}

export default App;
