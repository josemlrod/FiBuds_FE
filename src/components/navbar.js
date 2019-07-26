import React, {useState, useContext, useEffect,} from 'react';
import {AuthContext, UserContext,} from '../store';
import {Link,} from 'react-router-dom';
import firebase from '../services/firebase';
import M from 'materialize-css';

import Logo from '../assets/81b5bebd-4872-4dc2-a675-5f7227d1f8d8_200x200.png';
import SideNavIMG from '../assets/sidenav-img.jpg'

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [userData,] = useContext(UserContext);

    useEffect(_ => {
        M.AutoInit();
    }, [userData.userData])

    const handleLogOut = e => {
        firebase.auth().signOut();
        props.history.push('/landing')
    };

    const renderNav = _ => {
        if (!authUser.user && authUser.authLoaded) return <></>;
        if (!authUser.user && !authUser.authLoaded || !userData.userData && !userData.loaded) 
            return <></>;
        else {
            const {avatar_url, first_name, last_name, email,} = userData.userData;
            return(
                <>
                    <ul id="slide-out" className="sidenav n-backg-color">
                        <li>
                            <div className="user-view">
                                <div className="background col-12 p-0">
                                    <img src={SideNavIMG} style={{width: 'inherit'}} />
                                </div>
                                <a href="#user"><img className="circle" src={avatar_url}/></a>
                                <a href="#name"><span className="white-text name">{first_name} {last_name}</span></a>
                                <a href="#email"><span className="white-text email">{email}</span></a>
                            </div>
                        </li>
                        <li>
                            <Link to='/' className='l-color landing-font waves-effect' style={{textDecoration: 'none'}}>
                                <i className="material-icons l-color">home</i>Home
                            </Link>
                        </li>
                        <li><div className="divider"></div></li>
                        <li className='text-right' onClick={handleLogOut}>
                            <span className="waves-effect l-color landing-font px-3">Log Out</span>
                        </li>
                    </ul>
                    
                    <nav>
                        <div className="nav-wrapper n-backg-color">
                            <div className='row m-0'>
                                <div className='col-2'>
                                    <a href="#" data-target="slide-out" className="sidenav-trigger" style={{textDecoration: 'none'}}><i className="material-icons">menu</i></a>
                                </div>
                                <ul id="nav-mobile" className="right hide-on-med-and-down">
                                    <li><a href="sass.html">Sass</a></li>
                                    <li><a href="badges.html">Components</a></li>
                                    <li><a href="collapsible.html">JavaScript</a></li>
                                </ul>
                                <div className='col-8'>
                                    <Link to='/'>
                                        <img src={Logo} alt='app-logo'
                                            style={{height: '-webkit-fill-available'}} className='brand-logo' />
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </nav>
                </>
            )
        };
    };

    return(
        renderNav()
    );
};