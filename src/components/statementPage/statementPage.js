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
            return(
                <div className='container'>
                    <div className='row mt-5'>
                        <div className='col-12' style={{textAlign: '-webkit-center'}}>
                            <div className='col-6'>
                                <h1 className='g-color app-font'>{statementData.name}</h1>
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