import React from 'react';
import {Navigate} from 'react-router-dom';

const RouteGuard = ({component: Component, user, title}) => {
    const hasJWT = () => {
        let flag = false;
        localStorage.getItem("access_token") ? flag = true : flag = false
        return flag
    }

    return (
        hasJWT() ?
            <Component user={user} title={title}/>
            :
            <Navigate to={{pathname: '/login'}}/>
    );
};

export default RouteGuard;