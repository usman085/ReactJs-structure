import React from 'react';
import { Route,Redirect, useRouteMatch } from "react-router-dom";
import MainDashboard from "../screens/Admin/dashboard";
import Students from "../screens/Admin/student";
import Tutors from "../screens/Admin/Tutor";
import AdminSubjects from "../screens/Admin/subject";
import AdminClasses from "../screens/Admin/classes";
import AdminSessions from "../screens/Admin/sessions";

function AdminRoutes() {

    let { path } = useRouteMatch();

    return (

        <React.Fragment>

            <Route path={`${path}/dashboard`} component={MainDashboard} />
            <Route path={`${path}/student`} component={Students} />
            <Route path={`${path}/tutor`} component={Tutors} />
            <Route path={`${path}/subjects`} component={AdminSubjects} />
            <Route path={`${path}/class`} component={AdminClasses} />
            <Route path={`${path}/session`} component={AdminSessions} />
            {/* <Route render={() => <Redirect to={`${path}/dashboard`} />} /> */}

            
            {/* <Route render={() => <Redirect to={`${path}/dashboard`} />} /> */}



        </React.Fragment>



    );
}


export default AdminRoutes;