import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login/Login';
import Signup from './pages/Signup/Signup';
import Home from './pages/Home/Home';

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
