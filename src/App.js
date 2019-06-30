import React from 'react';
import {Route,} from 'react-router-dom';

import './App.css';

import NavBar from './components/navbar';
import Signup from './components/signup/signup';
import Login from './components/login/login';

function App() {
  return (
    <>
      <NavBar />
      <Route path='/login' component={Login} />
      <Route path='/signup' component={Signup} />
    </>
  );
}

export default App;
