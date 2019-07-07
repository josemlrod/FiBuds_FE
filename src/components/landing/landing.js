import React, {useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext,} from '../../store';

export default props => {
    const [authUser,] = useContext(AuthContext);
    console.log(authUser);

    const renderLanding = _ => {
        if (!authUser.user && !authUser.loaded) {
            return <h1>Loading...</h1>;
        } else if (authUser.user && authUser.loaded) {
            return <Redirect to='/' />;
        } else {
            return(
                <>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <button type='button'>
                                    Log In
                                </button>
                            </div>
                        </div>
                        <div className='row'>
                            <div className='col-12'>
                                <button type='button'>
                                    Sign Up
                                </button>
                            </div>
                        </div>
                    </div>
                </>
            )
        }
    }
    return(
        <>
            {
                renderLanding()
            }
        </>
    );
};