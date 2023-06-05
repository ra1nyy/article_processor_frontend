import React from 'react';
import {Navigate} from 'react-router-dom';

const RoutePublic = ({component: Component, ...rest}) => {

    const hasJWT = () => {
        return localStorage.getItem("access_token") ? true : false
    }

    return (
        hasJWT() ?
            <Navigate to={{pathname: '/'}}/>
            :
            <Component/>
    );
};

export default RoutePublic;