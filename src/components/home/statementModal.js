import React, {useState,} from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';
import {createStatement,} from '../../services/api';

export default props => {
    const [statementName, setStatementName,] = useState();
    const [statementBudget, setStatementBudget,] = useState();

    const updateStatementName = e => setStatementName(e.target.value);
    const updateStatementBudget = e => setStatementBudget(e.target.value);

    const handleSubmit = _ => {
        const {id: user_id,} = props.user;
        createStatement(statementName, statementBudget, user_id, false);
        props.toggle();
    }

    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle}>
          <ModalBody className='n-backg-color rounded'>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col-10 bottom-border-w text-center'>
                    <h3 className='l-color app-font'>Add Statement</h3>
                </div>
            </div>

            <div className='row mt-3' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font l-color landing-font'>
                    Name:
                </div>
            </div>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font text-center l-color landing-font'>
                    <input type='text' name='name' className='rounded' 
                        style={{width: 'inherit'}} onChange={updateStatementName} />
                </div>
            </div>

            <div className='row mt-2' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font l-color landing-font'>
                    Budget:
                </div>
            </div>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font text-center l-color landing-font'>
                    <input type='text' name='budget' className='rounded' 
                        style={{width: 'inherit'}} onChange={updateStatementBudget} />
                </div>
            </div>

            <div className='row mt-4 mb-2' style={{justifyContent: 'center'}}>
                <div className='col-11 text-right'>
                <button type="submit" className="btn b-backg-color l-color text-center"
                                        onClick={handleSubmit}>Submit</button>
                </div>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
};