import React, {useState, createContext,} from 'react';

export const AuthContext = createContext();
export const UserContext = createContext();

export const Store = props => {
    const [authUser, setAuthUser] = useState({
        user: null,
        authLoaded: false,
        loadedUserData: false,
    });

    const [userData, setUserData,] = useState({
        userData: null,
        loaded: false,
    });

    return(
        <AuthContext.Provider value={[authUser, setAuthUser]}>
            <UserContext.Provider value={[userData, setUserData]}>
                {props.children}
            </UserContext.Provider>
        </AuthContext.Provider>
    );
};