import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from '../screens/Auth/login';
import Register from '../screens/Auth/register';
import MainDashboard from "../screens/Main";
import AuthRoute from './AuthRoute';
// import ProgressBar from './ProgressBar';
// Routes Imports
// const Main = React.lazy(() => import('../screens/RestaurantPanel/Main'));
// const Register = React.lazy(() => import('../screens/Auth/Register'));
import LandingPage from "../screens/LandingPage/landingPage"
import ProtectedRoute from './ProtectedRoute';

function router() {
    return (
        <div className="App" >

            <BrowserRouter >
                <Switch>
                    <AuthRoute path="/login" element={Login} />
                    <AuthRoute path="/register" component={Register} />
                    <ProtectedRoute path="/v1" component={MainDashboard} />
                    <Route path="/landing" component={LandingPage} />

                    <Route render={() => <Redirect to={`/landing`} />} />

                </Switch>
            </BrowserRouter>

        </div>
    );
}

export default router;