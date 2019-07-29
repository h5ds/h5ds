import 'antd/dist/antd.css';

import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom'; // 路由

import { LocaleProvider } from 'antd';
import { history } from './utils';
import { routes } from './routes.config';

class Routers extends Component {
  componentDidMount() {
    console.log('get user');
  }

  render() {
    return (
      <LocaleProvider>
        <Router history={history}>
          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                render={props => <route.component {...props} routes={route.routes} parentRoute={route} />}
              />
            ))}
          </Switch>
        </Router>
      </LocaleProvider>
    );
  }
}

export default Routers;
