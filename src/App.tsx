import './App.css';

import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';

import Chat from './Chat';
import Dashboard from './Dashboard';
import Talk from './Talk';

const DASHBOARD_ROUTE = '/dashboard';
const CHAT_ROUTE = '/chat/:userID';
const TALK_ROUTE = '/talk/:userID';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route path={DASHBOARD_ROUTE} component={Dashboard} />
      <Route
        path={CHAT_ROUTE}
        render={({ match }) => {
          return <Chat userID={match.params.userID} />;
        }}
      />
      <Route
        path={TALK_ROUTE}
        render={({ match }) => {
          return <Talk userID={match.params.userID} />;
        }}
      />
      <Route
        path="*"
        render={({ location }) => {
          return <Redirect to={{ pathname: DASHBOARD_ROUTE, state: { from: location } }} />;
        }}
      />
    </Switch>
  </Router>
);

export default App;
