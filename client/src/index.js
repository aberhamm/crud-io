import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { render } from 'react-dom';
import { Route } from 'react-router-dom';
import { MuiThemeProvider } from 'material-ui/styles';
import { configureStore, history } from './store/configureStore';

import AppBar from './components/AppBar';

import theme from './theme';

import Routes from './routes';

const store = configureStore();

const App = () => (
  <div>
    <AppBar />
    { Routes }
  </div>
);

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <Route path="/" component={App} />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('app')
);
