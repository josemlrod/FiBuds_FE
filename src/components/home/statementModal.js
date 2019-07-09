import React from 'react';
import {Button, Modal, ModalHeader, ModalBody, ModalFooter,} from 'reactstrap';

export default props => {
    const handleSubmit = _ => {
        console.log('you clicked baby')
    }
    return (
      <div>
        <Modal isOpen={props.modal} toggle={props.toggle}>
          {/* <ModalHeader toggle={props.toggle}>Add Statement</ModalHeader> */}
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
                    <input type='text' className='rounded' style={{width: 'inherit'}} />
                </div>
            </div>

            <div className='row mt-2' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font l-color landing-font'>
                    Budget:
                </div>
            </div>
            <div className='row' style={{justifyContent: 'center'}}>
                <div className='col-11 app-font text-center l-color landing-font'>
                    <input type='text' className='rounded' style={{width: 'inherit'}} />
                </div>
            </div>

            <div className='row mt-4 mb-2' style={{justifyContent: 'center'}}>
                <div className='col-11 text-right'>
                <button type="submit" className="btn b-backg-color l-color text-center"
                                        onClick={handleSubmit}>Submit</button>
                </div>
            </div>
          </ModalBody>
          {/* <ModalFooter>
            <Button color="primary" onClick={props.toggle}>Do Something</Button>{' '}
            <Button color="secondary" onClick={props.toggle}>Cancel</Button>
          </ModalFooter> */}
        </Modal>
      </div>
    );
};