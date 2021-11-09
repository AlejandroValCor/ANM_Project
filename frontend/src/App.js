import './App.css';
import Nav from './components/Nav';
import Home from './components/Home';
import SearchHistory from './components/SearchHistory';
import LargestEarthquakes from './components/LargestEarthquakes'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Nav/>
          <Routes>
            <Route exact path="/" element={<Home/>}/>
            <Route exact path="/SearchHistory" element={<SearchHistory/>}/>
            <Route exact path="/LargestEarthquakes" element={<LargestEarthquakes/>}/>
          </Routes>
        </header>
      </div>
    </Router>
  );
}

export default App;