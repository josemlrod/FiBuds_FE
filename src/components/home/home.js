import React, {useState, useContext, useEffect,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext,} from '../../store';
import {getUserByEmail,} from '../../services/api';
import Plus from '../../assets/plus.svg';

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [user, setUser,] = useState({
        user: null,
        loaded: false,
    });

    useEffect(_ => {
        if (authUser.user) {
            const userData = getUserByEmail(authUser.user.email)
                .then(data => setUser({
                    user: data,
                    loaded: true,
                }))
                .catch(e => new Error(e));
        };
    }, [authUser.user]);

    const renderHome = _ => {
        if (!authUser.user && authUser.loaded) {
            return <Redirect to='/landing' />
        } else if (!authUser.user && !authUser.loaded || !user.user && !user.loaded) {
            return <h1>Loading...</h1>
        } else {
            const {userData, userStatements,} = user.user;
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-right'>
                            <img src={Plus} alt='plus icon' 
                                style={{height: 50, weight: 50}} className='my-3' />
                        </div>
                    </div>
                    <div className='row'>
                        {
                            userStatements.length < 1 ?
                                <div className='col-12' style={{textAlign: '-webkit-center'}}>
                                    <div 
                                        className='col-10 border b-rad py-5 n-backg-color l-color app-font font-size-form'>
                                        No statements to render. Add one!
                                    </div>
                                </div>
                            :
                                <div className='col-12 text-center'>
                                    <div className='col-8'>
                                        Should render statements now!
                                    </div>
                                </div>
                        }
                    </div>
                </div>
            );
        };
    };

    return(
        renderHome()
    )
}