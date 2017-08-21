require('../styles/main.scss');
require('../styles/rc-slider-index.scss');
require('../styles/rc-slider-bootstrap.scss');

import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ReactDOM from 'react-dom'
import App from './App.jsx';
import Greetings from './Greetings.jsx';
import SignupPage from './SignupPage.jsx';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';
import setAuthorizationToken from '../utils/setAuthorizationToken.jsx'
import jwt from 'jsonwebtoken';
import { setCurrentUser } from '../actions/loginActions.jsx';
import rootReducer from '../rootReducer.jsx'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f)
)

if (localStorage.jwtToken) {
  setAuthorizationToken(localStorage.jwtToken);
  store.dispatch(setCurrentUser(jwt.decode(localStorage.jwtToken)));
}
setAuthorizationToken(localStorage.jwtToken);

const Root = () => (
  <MuiThemeProvider>
    <Provider store={store}>
      <Router>
        <Route path="/" component={App}>
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>
)

ReactDOM.render(
  <Root />, 
  document.getElementById('react-root')
);
