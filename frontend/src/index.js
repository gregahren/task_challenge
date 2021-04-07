import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { Switch, Route, Router } from 'react-router-dom';
import '@elastic/eui/dist/eui_theme_light.css';
import { setHttpInterceptors } from './utils/api';
import reducers from './root_reducer';
import Login from './auth/components/Login';
import {
  AUTH_USER
} from './auth/action_types';
import './index.css';
import App from './App';
import Register from './auth/components/Register';
import history from './utils/history';
// import App from './core/components/App';

// create store
const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);
export const store = createStoreWithMiddleware(reducers);

// set http interceptors (setting authentication token)
setHttpInterceptors(store);

// if we have token dispatch action that will say, 
// hey you are authenticated, you have token saved in LS
const token = localStorage.getItem('token');
if (token) {
    store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
      <Router history={history}>
          <Switch>
              <Route exact path='/login' component={Login} />
              <Route path='/register' component={Register} />
              <Route path='/' component={App} />
          </Switch>
      </Router>
  </Provider>,
  document.getElementById('root')
);
