
import React from 'react';
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        !localStorage.getItem('user_auth_config')
            ? <Component {...props} />
            : <Redirect to='/v1' />
    )} />
)

export default AuthRoute;