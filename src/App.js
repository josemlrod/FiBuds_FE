import React, {useContext, useEffect,} from 'react';
import {Route,} from 'react-router-dom';
import {AuthContext,} from './store';
import firebase from './services/firebase';

import './App.css';

import NavBar from './components/navbar';
import Landing from './components/landing/landing';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Home from './components/home/home';

export default props => {
  const [, setAuthUser] = useContext(AuthContext);

  useEffect(_ => {
    const unsuscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser({
          user,
          loaded: true,
        });
      } else {
        setAuthUser({
          user: null,
          loaded: true,
        });
      };
    });
  }, []);

  return (
    <>
      <Route path='/' component={NavBar} />
      <Route path='/landing' exact component={Landing} />
      <Route path='/login' exact component={Login} />
      <Route path='/signup' exact component={Signup} />
      <Route path='/' exact component={Home} />
    </>
  );
};