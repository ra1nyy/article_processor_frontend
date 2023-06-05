import {createContext, useEffect, useState} from 'react';
import {getUser} from "./actions/auth";

export const AuthContext = createContext(null);

export const AuthContextProvider = (props) => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        if (!user && localStorage.getItem('access_token')) {
            getUser(setUser).then(r => {setUser(r)});
        } else if (!localStorage.getItem('access_token')
            && window.location.href.search('/login') === -1 ) {
            window.location.href = '/login';
        }
    }, [user]);

    return (
        <AuthContext.Provider value={{user: user, setUser: setUser}}>
            {props.children}
        </AuthContext.Provider>
    );
};