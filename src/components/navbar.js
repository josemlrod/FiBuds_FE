import React, {useState, useContext,} from 'react';
import {AuthContext,} from '../store';
import {Link,} from 'react-router-dom';
import firebase from '../services/firebase';
import Logo from '../assets/81b5bebd-4872-4dc2-a675-5f7227d1f8d8_200x200.png';

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [toggleNav, setToggleNav,] = useState(false);
    
    const toggleHandler = e => setToggleNav(!toggleNav);
    const handleLogOut = e => {
        toggleHandler();
        firebase.auth().signOut();
        props.history.push('/landing')
    };

    const renderNav = _ => {
        if (!authUser.user && authUser.authLoaded) return <></>;
        else if (!toggleNav) {
            return(
                <nav className="navbar navbar-expand-lg navbar-light n-backg-color">
                    <Link to='/'>
                        <img src={Logo} className='logo' alt='app logo' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" 
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleHandler}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item border-down-b">
                                <Link to='/' className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link" onClick={handleLogOut}>Log Out</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        } else {
            return(
                <nav className="navbar navbar-expand-lg navbar-light n-backg-color">
                    <Link to='/'>
                        <img src={Logo} className='logo' alt='app logo' />
                    </Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" 
                        aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation" onClick={toggleHandler}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="navbar-collapse" id="navbarTogglerDemo02">
                        <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                            <li className="nav-item border-down-b">
                                <Link to='/' className="nav-link app-font l-color pointer">Home</Link>
                            </li>
                            <li className="nav-item">
                                <span className="nav-link app-font l-color pointer" onClick={handleLogOut}>Log Out</span>
                            </li>
                        </ul>
                    </div>
                </nav>
            )
        }
    }

    return(
        renderNav()
    );
};