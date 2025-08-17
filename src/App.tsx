import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Docs from './pages/Docs';
import About from './pages/About';
import { loadModules } from './utils/moduleLoader';

const App: React.FC = () => {
  // Load all utility modules dynamically
  const modules = loadModules();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout modules={modules} />}>
          <Route index element={<Home modules={modules} />} />
          <Route path="about" element={<About />} />
          <Route path="docs" element={<Docs />} />
          
          {/* Dynamic routes for each utility module */}
          {modules.map((module) => (
            <Route
              key={module.route}
              path={module.route.startsWith('/') ? module.route.slice(1) : module.route}
              element={<module.Component />}
            />
          ))}
        </Route>
      </Routes>
    </Router>
  );
};

export default App;