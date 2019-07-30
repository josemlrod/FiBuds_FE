import React, {useContext, useEffect,} from 'react';
import {Route,} from 'react-router-dom';
import {AuthContext, UserContext,} from './store';
import firebase from './services/firebase';
import {getUserByEmail,} from './services/api';

import './App.css';

import NavBar from './components/navbar';
import Landing from './components/landing/landing';
import Signup from './components/signup/signup';
import Login from './components/login/login';
import Home from './components/home/home';
import StatementPage from './components/statementPage/statementPage';

export default props => {
  const [, setAuthUser] = useContext(AuthContext);
  const [, setUserData,] = useContext(UserContext);

  useEffect(_ => {
    const unsuscribe = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        setAuthUser({
          user,
          authLoaded: true,
          loadedUserData: false,
        });

        getUserByEmail(user.email)
          .then(data => {
            setUserData(prevUser => {
              const {userStatements: userStatementData,} = data;
              const statementsToRender = [];
              for (let statement of userStatementData) statementsToRender.unshift(statement);
              prevUser.userData = data.userData;
              prevUser.loaded = true;
              prevUser.statements = statementsToRender;
              return {
                userData: data.userData,
                loaded: true,
                statements: statementsToRender,
              };
            });
            setAuthUser(authUser => Object.assign(authUser, {loadedUserData: true,}));
          })
          .catch(e => new Error(e));
      } else {
        setAuthUser({
          user: null,
          authLoaded: true,
          loadedUserData: false,
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
      <Route path='/statement/:id' exact component={StatementPage} />
    </>
  );
};