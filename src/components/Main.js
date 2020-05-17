import React from 'react';
import { Switch,Route } from 'react-router-dom';

import Login from '../pages/Login'
import SignUp from '../pages/Signup';
import Dashboard from '../pages/Dashboard';
import Home from '../pages/Home';
import SignupAsMember from '../pages/SignupAsMember';
import Usage from '../pages/UsageReport';

const Main=()=>{
    return (
            <div className="home" >
                {/* <Navbar /> */}
                <Switch>
                    <Route path="/" exact component={Dashboard} />
                    <Route path="/home" exact component={Home} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup/member" component={SignupAsMember} />
                    <Route path="/signup" component={SignUp} />
                    <Route path="/usage" component={Usage} />
                </Switch>                    
            </div>
    )
}

export default Main;
