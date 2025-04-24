import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import MatatuDetailPage from './pages/MatatuDetailPage';

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/matatu/:id" component={MatatuDetailPage} />
      </Switch>
    </Router>
  );
};

export default App;
