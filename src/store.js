import React, {useState, createContext,} from 'react';

export const AuthContext = createContext();

export const Store = props => {
    const [authUser, setAuthUser] = useState({
        user: null,
        authLoaded: false,
        loadedUserData: false,
    });

    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            {props.children}
        </AuthContext.Provider>
    );
};