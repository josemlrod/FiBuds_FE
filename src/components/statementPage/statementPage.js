import React, {useEffect, useState, useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext, UserContext} from '../../store'
import {getStatementByID, createExpense, getStatementExpenses,} from '../../services/api';
import M from 'materialize-css';

import ExpenseCard from './expenseCard';

export default props => {
    const [authUser,] = useContext(AuthContext);
    const [userData,] = useContext(UserContext);
    const [statement, setStatement,] = useState({statementData: null, loaded: false,});
    const [expenseName, setExpenseName,] = useState('');
    const [expenseAmt, setExpenseAmt,] = useState('');
    const [expenseType, setExpenseType,] = useState(false);
    const [allExpenses, setAllExpenses,] = useState({fixed: null, other: null, loaded: false,})
    const [modalState, setModalState,] = useState(false);
    
    useEffect(_ => {
        const {id: statement_id,} = props.match.params;
        const statementData = getStatementByID(statement_id)
            .then(statement => setStatement({statementData: statement, loaded: true,}));
        if (userData.userData) {
            const {id: user_id,} = userData.userData;
            const statementExpenses = getStatementExpenses(user_id, statement_id)
                .then(response => response.data.expenses)
                .then(expenses => setAllExpenses({fixed: expenses.fixed, other: expenses.other, loaded: true,}));
        };
    }, [userData.userData, allExpenses]);

    useEffect(_ => {
        M.AutoInit();
        document.addEventListener('DOMContentLoaded', function() {
            var elems = document.querySelectorAll('.modal');
            var instances = M.Modal.init(elems);
        });
    }, [modalState]);

    const updateExpenseName = e => setExpenseName(e.target.value);
    const updateExpenseAmt = e => setExpenseAmt(e.target.value);
    const updateExpenseType = _ => setExpenseType(!expenseType);

    const handleAddExpense = e => {
        const {id: user_id,} = userData.userData;
        const {id: statement_id,} = statement.statementData;
        const createExpPOST = createExpense(expenseType, expenseAmt, user_id, statement_id, expenseName);
        expenseType ? 
            setAllExpenses(prevExpenses => {
                const {fixed,} = prevExpenses;
                fixed.unshift({fixed: expenseType, amount: expenseAmt, user_id, statement_id, name: expenseName});
                return prevExpenses;
            })
        :
            setAllExpenses(prevExpenses => {
                const {other,} = prevExpenses;
                other.unshift({fixed: expenseType, amount: expenseAmt, user_id, statement_id, name: expenseName});
                return prevExpenses;
            });
        setModalState();
    };

    const renderExpenses = (expType, loadedState) => {
        if (!expType && !loadedState) 
            return <li className="list-group-item w-backg-color">Cargando...</li>;
        else if (!expType.length && loadedState) 
            return <li className="list-group-item w-backg-color">Nada que cargar</li>;
        else 
            return expType.map((e, i) => <ExpenseCard name={e.name} amount={e.amount} key={i} />);
    };

    const renderStatementPage = _ => {
        if (!authUser.user && authUser.authLoaded) {
            return <Redirect to='/landing' />
        } else if (!authUser.user && !authUser.authLoaded || !statement.statementData && !statement.loaded) {
            return <h1>Loading...</h1>
        } else {
            const {statementData,} = statement;
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
                                        {
                                            renderExpenses(allExpenses.fixed, allExpenses.loaded)
                                        }
                                </ul>
                            </div>

                            <div className='col-12 my-1'>
                                <ul className="list-group">
                                    <li className="list-group-item n-backg-color l-color font-size-form app-font">Other Expenses</li>
                                        {
                                            renderExpenses(allExpenses.other, allExpenses.loaded)   
                                        }
                                </ul>
                            </div>
                            
                            <div className='col-12 my-2 text-right'>
                                <a className="btn-floating btn-large n-backg-color modal-trigger" 
                                    onClick={setModalState} href="#modal1">
                                    <i className="large material-icons l-color">create</i>
                                </a>

                                <div id="modal1" className="modal bottom-sheet n-backg-color" style={{height: 'auto'}}>
                                    <div className="modal-content text-center n-backg-color">
                                        <div className='row'>
                                            <div className='col-12 l-color app-font'>
                                                <h2>Add Expense</h2>
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-3 app-font l-color font-size-form'>
                                                Name:
                                            </div>
                                            <div className='col-9 app-font text-center l-color landing-font'>
                                                <input type='text' name='name' className='rounded w-backg-color' 
                                                    style={{width: 'inherit'}} onChange={updateExpenseName} />
                                            </div>
                                        </div>
                                        
                                        <div className='row'>
                                            <div className='col-3 app-font l-color font-size-form'>
                                                Amount:
                                            </div>
                                            <div className='col-9 app-font text-center l-color landing-font'>
                                                <input type='text' name='budget' className='rounded w-backg-color' 
                                                    style={{width: 'inherit'}} onChange={updateExpenseAmt} />
                                            </div>
                                        </div>
                                        <div className='row'>
                                            <div className='col-12 text-center'>
                                                <div className="switch app-font l-color">
                                                    <label>
                                                        Spontaneous Expense
                                                    <input type="checkbox" onChange={updateExpenseType} />
                                                    <span className="lever"></span>
                                                        Fixed Expense
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className='row' style={{justifyContent: 'center'}}>
                                            <div className='col-12 text-right'>
                                                <button type="submit" className="btn b-backg-color app-font l-color text-center"
                                                    onClick={handleAddExpense}>
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>
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
    );
};