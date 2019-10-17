import React from 'react';
import  { Switch, Route, Redirect } from 'react-router-dom';
import Home from './Modules/Home/index';

const routes = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
        </Switch>
    )
}

export default routes;