import React from 'react';

import Logo from '../assets/81b5bebd-4872-4dc2-a675-5f7227d1f8d8_200x200.png';

export default props => {
    return(
        <nav className="navbar navbar-expand-lg navbar-light n-backg-color">
            <img src={Logo} className='logo' alt='app logo' />
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                    <a className="nav-link" href="google.com">Home <span className="sr-only">(current)</span></a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="google.com">Link</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link disabled" href="google.com" tabIndex="-1" aria-disabled="true">Disabled</a>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search" />
                    <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
        </nav>
    );
};