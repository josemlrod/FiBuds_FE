import React, {useState, createContext,} from 'react';

export const UserContext = createContext();

export const Store = props => {
    const [user, setUser] = useState([{
        name: null,
        loaded: false,
    }]);
    return(
        <UserContext.Provider value={[user, setUser]}>
            {props.children}
        </UserContext.Provider>
    );
};