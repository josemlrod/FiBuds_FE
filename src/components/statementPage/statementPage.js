import React, {useEffect, useState, useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext, UserContext} from '../../store'
import {getStatementByID,} from '../../services/api';
import M from 'materialize-css';

export default props => {
    const [authUser, setAuthUser,] = useContext(AuthContext);
    const [userData,] = useContext(UserContext);
    const [statement, setStatement,] = useState({statementData: null, loaded: false,});
    
    useEffect(_ => {
        const {id,} = props.match.params;
        const statementData = getStatementByID(id)
            .then(statement => setStatement({statementData: statement, loaded: true,}));
    }, []);

    useEffect(_ => {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.fixed-action-btn');
            var instances = M.FloatingActionButton.init(elems);
        });
    });

    const handleAddExpense = e => {
        console.log('wants to add expense');
        console.dir(e.target);
    };

    const renderStatementPage = _ => {
        if (!authUser.user && authUser.authLoaded) {
            return <Redirect to='/landing' />
        } else if (!authUser.user && !authUser.authLoaded || !statement.statementData && !statement.loaded) {
            return <h1>Loading...</h1>
        } else {
            const {statementData,} = statement;
            console.log(1, authUser);
            console.log(2, userData);
            console.log(3, statementData);
            return(
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-12' style={{textAlign: '-webkit-center'}}>
                            <div className="col-12">
                                <div className="card-body app-font n-backg-color rounded">
                                    <h1 className='l-color'>{statementData.name}</h1>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated b-backg-color" role="progressbar" aria-valuenow="75" 
                                        aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12 my-1'>
                                <ul className="list-group">
                                    <li className="list-group-item n-backg-color l-color font-size-form app-font">Fixed Expenses</li>
                                    <li className="list-group-item w-backg-color">Dapibus ac facilisis in</li>
                                    <li className="list-group-item w-backg-color">Morbi leo risus</li>
                                    <li className="list-group-item w-backg-color">Porta ac consectetur ac</li>
                                    <li className="list-group-item w-backg-color">Vestibulum at eros</li>
                                </ul>
                            </div>

                            <div className='col-12 my-1'>
                                <ul className="list-group">
                                    <li className="list-group-item n-backg-color l-color font-size-form app-font">Spontaneous Expenses</li>
                                    <li className="list-group-item w-backg-color">Dapibus ac facilisis in</li>
                                    <li className="list-group-item w-backg-color">Morbi leo risus</li>
                                    <li className="list-group-item w-backg-color">Porta ac consectetur ac</li>
                                    <li className="list-group-item w-backg-color">Vestibulum at eros</li>
                                </ul>
                            </div>

                            <div className='col-12 my-1'>
                                <div className="fixed-action-btn">
                                    <a className="btn-floating btn-large n-backg-color">
                                        <i className="large material-icons l-color">create</i>
                                    </a>
                                    <ul>
                                        <li>
                                            <a className="btn-floating g-backg-color" onClick={handleAddExpense}> 
                                                <i className="material-icons">attach_money</i>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        };
    }

    return(
        <>
            {
                renderStatementPage()
            }
        </>
    )
}