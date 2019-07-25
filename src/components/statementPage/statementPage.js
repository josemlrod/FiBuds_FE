import React, {useEffect, useState, useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext, UserContext} from '../../store'
import {getStatementByID,} from '../../services/api';

export default props => {
    const [authUser, setAuthUser,] = useContext(AuthContext);
    const [userData,] = useContext(UserContext);
    const [statement, setStatement,] = useState({statementData: null, loaded: false,});
    
    useEffect(_ => {
        const {id,} = props.match.params;
        const statementData = getStatementByID(id)
            .then(statement => setStatement({statementData: statement, loaded: true,}));
    }, []);

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
                    <div className='row mt-5 pt-3'>
                        <div className='col-12' style={{textAlign: '-webkit-center'}}>
                            <div className='col-6'>
                                <h1 className='n-color app-font'>{statementData.name}</h1>
                            </div>
                        </div>
                    </div>

                    <div className='container'>
                        <div className='row'>
                            <div className='col-12'>
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated n-backg-color" role="progressbar" aria-valuenow="75" 
                                        aria-valuemin="0" aria-valuemax="100" style={{width: "75%"}}></div>
                                </div>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='col-12 my-3'>
                                <ul className="list-group">
                                    <li className="list-group-item n-backg-color l-color font-size-form app-font">Fixed Expenses</li>
                                    <li className="list-group-item w-backg-color">Dapibus ac facilisis in</li>
                                    <li className="list-group-item w-backg-color">Morbi leo risus</li>
                                    <li className="list-group-item w-backg-color">Porta ac consectetur ac</li>
                                    <li className="list-group-item w-backg-color">Vestibulum at eros</li>
                                </ul>
                            </div>

                            <div className='col-12 my-3'>
                                <ul className="list-group">
                                    <li className="list-group-item n-backg-color l-color font-size-form app-font">Spontaneous Expenses</li>
                                    <li className="list-group-item w-backg-color">Dapibus ac facilisis in</li>
                                    <li className="list-group-item w-backg-color">Morbi leo risus</li>
                                    <li className="list-group-item w-backg-color">Porta ac consectetur ac</li>
                                    <li className="list-group-item w-backg-color">Vestibulum at eros</li>
                                </ul>
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