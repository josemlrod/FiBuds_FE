import React, {useContext,} from 'react';
import {Redirect, Link,} from 'react-router-dom';
import {AuthContext,} from '../../store';
import Logo from '../../assets/logowname.png';

export default props => {
    const [authUser,] = useContext(AuthContext);

    const renderLanding = _ => {
        if (!authUser.user && !authUser.loaded) {
            return <h1>Loading...</h1>;
        } else if (authUser.user && authUser.loaded) {
            return <Redirect to='/' />;
        } else {
            return(
                <>
                    <div className='container border n-backg-color' style={{height: '100vh'}}>
                        <div className='row my-5 text-center'>
                            <div className='col-12 my-5 pt-5'>
                                <img src={Logo} alt='app logo' />
                            </div>
                        </div>

                        <div className='row my-5' style={{justifyContent: 'center'}}>
                            <div className='col-12 text-center p-1 my-2'>
                                <Link to='/login'>
                                    <button type='button' className='l-color app-font button-settings px-5 py-3 landing-font'>
                                        Log In
                                    </button>
                                </Link>
                            </div>

                            <div className='col-12 text-center'>
                                <h1 className='l-color app-font'>OR</h1>
                            </div>
                            
                            <div className='col-12 text-center p-1 my-2'>
                                <Link to='/signup'>
                                    <button type='button' className='l-color app-font button-settings px-5 py-3 landing-font'>
                                        Sign Up
                                    </button>
                                </Link>
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