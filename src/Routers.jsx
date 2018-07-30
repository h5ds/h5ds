import { BrowserRouter, Route, Switch } from 'react-router-dom'; // 路由
import React, { Component } from 'react';

import HomePage from './pages/home/HomePage';

export default class Routers extends Component {
    render() {
        return (
            <BrowserRouter>
                <Switch>
                    <Route path="/" exact component={HomePage} />
                </Switch>
            </BrowserRouter>
        );
    }
}
