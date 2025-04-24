import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home.js';
import MatatuDetailPage from './pages/MatatuDetailPage.js';

const App = () => {
  return (
    <Router>
        <Route exact path="/" component={Home} />
        <Route path="/matatu/:id" component={MatatuDetailPage} />
    </Router>
  );
};

export default App;
