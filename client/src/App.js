import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import home from './Home'
import withAuth from './withAuth'
import login from './Login'

function App() {
  return (
      <Router>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
          </ul>
          <Switch>
            <Route path="/" exact component={withAuth(home)} />
            <Route path="/login" component={login} />
          </Switch>
      </Router>
  );
}

export default App;