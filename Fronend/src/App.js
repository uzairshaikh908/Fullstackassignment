import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import Registration from './Components/Registration';
import Dashboard from './Components/Dashboard'
import './App.css';

function App() {
  return (
   <div>
    <Router>
    <Routes>
          <Route path="/" element={<Registration />} />
          <Route path="/dashboard" element={<Dashboard />} />
         
        </Routes>
        </Router>
   </div>
  );
}

export default App;
