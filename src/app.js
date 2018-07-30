import { Provider } from 'mobx-react';
import React from 'react';
import Routers from './Routers';
import { render } from 'react-dom';
import stores from './store';

// 路由
render(
    <Provider {...stores}>
        <Routers />
    </Provider>,
    document.getElementById('App')
);
