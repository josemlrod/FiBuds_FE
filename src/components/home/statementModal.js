import React, {useState,} from 'react';
import {createStatement,} from '../../services/api';

export default props => {
    const [statementName, setStatementName,] = useState();
    const [statementBudget, setStatementBudget,] = useState();

    const updateStatementName = e => setStatementName(e.target.value);
    const updateStatementBudget = e => setStatementBudget(e.target.value);

    const handleSubmit = _ => {
        const {id: user_id,} = props.user;
        createStatement(statementName, statementBudget, user_id, 'false')
            .then(response => response.data.data.id)
            .then(statement_id => props.setUserData(prevUserData => {
                prevUserData.statements.unshift({
                    id: statement_id,
                    name: statementName,
                    budget: statementBudget,
                    user_id,
                    saved: 'false',
                });
                return {...prevUserData};
            }));
    };

    return(
      <div>
          <div id="modal1" className="modal bottom-sheet n-backg-color" style={{height: 'auto'}}>
            <div className="modal-content text-center n-backg-color">
                <div className='row'>
                    <div className='col-12 l-color app-font'>
                        <h2>Add Statement</h2>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-3 app-font l-color font-size-form'>
                        Name:
                    </div>
                    <div className='col-9 app-font text-center l-color landing-font'>
                        <input type='text' name='name' className='rounded w-backg-color' 
                            style={{width: 'inherit'}} onChange={updateStatementName} />
                    </div>
                </div>
                
                <div className='row mt-2'>
                    <div className='col-3 app-font l-color font-size-form'>
                        Budget:
                    </div>
                    <div className='col-9 app-font text-center l-color landing-font'>
                        <input type='text' name='budget' className='rounded w-backg-color' 
                            style={{width: 'inherit'}} onChange={updateStatementBudget} />
                    </div>
                </div>
                
                <div className='row' style={{justifyContent: 'center'}}>
                    <div className='col-12 text-right'>
                    <button type="submit" className="btn b-backg-color app-font l-color text-center"
                        onClick={handleSubmit}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
};