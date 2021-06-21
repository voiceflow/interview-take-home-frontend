import './App.css';

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Chat from './Chat';
import Dashboard from './Dashboard';

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path={DASHBOARD_ROUTE}>
        <Dashboard />
      </Route>
      <Route path={CHAT_ROUTE}>
        <Chat />
      </Route>
      <Route path="/">
        <Redirect to={DASHBOARD_ROUTE} />
      </Route>
    </Switch>
  </Router>
);

export default App;
