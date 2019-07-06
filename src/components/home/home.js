import React, {useState, useContext, useEffect,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext,} from '../../store';
import {getUserByEmail,} from '../../services/api';

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [, setUser,] = useState();

    useEffect(_ => {
        if (authUser.user) {
            const userData = getUserByEmail(authUser.user.email)
                .then(response => {
                    return response.data.data;
                })
                .then(user => setUser(user));
        };
    }, [authUser.user]);

    const renderHome = _ => {
        if (!authUser.user && !authUser.loaded) {
            return(
                <h1>Loading...</h1>
            )
        } else if (!authUser.user && authUser.loaded) {
            return(
                <Redirect to='/login' />
            );
        } else {
            return(
                <h1>
                    This is home
                </h1>
            );
        };
    };

    return(
        renderHome()
    )
}