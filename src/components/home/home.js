import React, {useContext, useEffect,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext, UserContext,} from '../../store';
import {getUserByEmail,} from '../../services/api';
import Plus from '../../assets/plus.svg';
import M from 'materialize-css';

import StatementModal from './statementModal';
import StatementCard from './statementCard';

export default props => {
    const [authUser, setAuthUser,] = useContext(AuthContext);
    const [userData, setUserData,] = useContext(UserContext);
    
    useEffect(_ => {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        });
    
        if (!authUser.loadedUserData && authUser.user) {
            getUserByEmail(authUser.user.email)
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
        };
    }, [authUser.user,]);
    
    const handleStatementClick = statementID => props.history.push(`/statement/${statementID}`);

    const renderHome = _ => {
        if (!authUser.user && authUser.authLoaded) {
            return <Redirect to='/landing' />
        } else if (!authUser.user && !authUser.authLoaded || !userData.userData && !userData.loaded) {
            return <h1>Loading...</h1>
        } else {
            return(
                <div className='container'>
                    <div className='row'>
                        <div className='col-12 text-right mt-4'>
                            <a className="waves-effect waves-light modal-trigger rounded-circle" href="#modal1">
                                <img src={Plus} alt='plus icon' 
                                        style={{height: 50, width: 50}} className='' />
                            </a>
                            <StatementModal user={userData.userData} setUserData={setUserData} />
                        </div>
                    </div>
                    <div className='row'>
                        {
                                userData.statements.length < 1 ?
                                    <div className='col-12' style={{textAlign: '-webkit-center'}}>
                                        <div 
                                            className='col-10 b-rad py-5 n-backg-color l-color app-font font-size-form'>
                                            No statements to render. 
                                            Start controlling your expenses today!
                                        </div>
                                    </div>
                            :
                                userData.statements.map((e, i) => 
                                    <StatementCard userStatement={e} key={i} handleStatementClick={handleStatementClick} />)
                        }
                    </div>
                </div>
            );
        };
    };

    return(
        renderHome()
    );
};