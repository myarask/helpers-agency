import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';
import { Layout, ThemeProvider } from 'components';
import NewUser from 'pages/NewUser';
import Home from 'pages/Home';
import User from 'pages/User';
import Users from 'pages/Users';
import Performance from 'pages/Performance';
import Financials from 'pages/Financials';
import Services from 'pages/Services';
import Visit from 'pages/Visit/Visit';
import Unauthorized from 'pages/Unauthorized';
import VisitsIncoming from 'pages/VisitsIncoming/VisitsIncoming';
import {
  AgencyProvider,
  IdentityProvider,
  DrawerProvider,
  OngoingVisitProvider,
} from 'providers';
import paths from 'constants/paths';
import history from 'utils/history';
import { useAuth0 } from '@auth0/auth0-react';
import { LinearProgress } from '@material-ui/core';

const App = () => {
  const auth0 = useAuth0();
  const hasError = window.location.search.includes('error=');

  if (auth0.isLoading) {
    return <LinearProgress />;
  }

  if (!auth0.isAuthenticated && !hasError) {
    auth0.loginWithRedirect();
  }

  if (!auth0.isAuthenticated && hasError) {
    return <Unauthorized />;
  }

  return (
    <ThemeProvider>
      <AgencyProvider>
        <IdentityProvider>
          <OngoingVisitProvider>
            <Router history={history}>
              <DrawerProvider>
                <Layout>
                  <Switch>
                    <Route path={paths.newUser} component={NewUser} />
                    <Route path={paths.user} component={User} />
                    <Route path={paths.users} component={Users} />
                    <Route path={paths.performance} component={Performance} />
                    <Route path={paths.financials} component={Financials} />
                    <Route path={paths.services} component={Services} />
                    <Route
                      path={paths.visitsIncoming}
                      component={VisitsIncoming}
                    />
                    <Route path={paths.visit} component={Visit} />
                    <Redirect to={paths.visitsIncoming} />
                    <Route path={paths.home} component={Home} />
                  </Switch>
                </Layout>
              </DrawerProvider>
            </Router>
          </OngoingVisitProvider>
        </IdentityProvider>
      </AgencyProvider>
    </ThemeProvider>
  );
};

export default App;
