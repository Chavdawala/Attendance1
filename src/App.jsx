import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import Index from './components/Index';
import Department from './components/Department';
import Fullstack from './components/Fullstack';
import Dataana from './components/Dataana';
import Hr from './components/Hr';
import Logout from './components/Logout';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/index" element={<Index />} />
        <Route path="/department" element={<Department />} />
        <Route path="/fullstack" element={<Fullstack />} />
        <Route path="/dataana" element={<Dataana />} />
        <Route path="/hr" element={<Hr />} /> {/* Changed to '/hr' */}
        <Route path="/logout" element={<Logout />} />
        
      </Routes>
    </Router>
  );
};

export default App;
