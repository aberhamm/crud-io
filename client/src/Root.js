import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { MuiThemeProvider } from 'material-ui/styles';

import AppBar from './components/AppBar';

import theme from './theme';

import Routes from './routes';

const App = () => (
  <div>
    <AppBar />
    { Routes }
  </div>
);

export default function Root({store, history}) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <MuiThemeProvider theme={theme}>
          <Route path="/" component={App}/>
        </MuiThemeProvider>
      </ConnectedRouter>
    </Provider>
  );
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
