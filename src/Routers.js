import 'antd/dist/antd.css';

import React, { Component } from 'react';
import { Route, Router, Switch } from 'react-router-dom'; // 路由
import { inject, observer } from 'mobx-react';

import { ConfigProvider } from 'antd';
import { history } from './utils';
import { routes } from './routes.config';

@inject('user')
@observer
class Routers extends Component {
  render() {
    return (
      <ConfigProvider>
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
      </ConfigProvider>
    );
  }
}

export default Routers;
