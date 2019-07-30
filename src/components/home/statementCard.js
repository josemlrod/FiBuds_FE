import React from 'react';

export default props => {
    const handleStatementClick = _ => props.handleStatementClick(props.userStatement.id);
    return(
        <>
            <div className='container pb-3'>
                <div className='col-12 n-backg-color rounded' onClick={handleStatementClick}>
                    <div className='row pt-2' style={{justifyContent: 'flex-end'}}>
                        <div className='col-8 app-font l-color text-right'>
                            {
                                props.userStatement.saved === 'false' ?
                                    <span>Incomplete</span>
                                :
                                    <span>Complete</span>
                            }
                        </div>
                    </div>
                    <div className='row py-2' style={{justifyContent: 'center'}}>
                        <div className='col-10 app-font l-color font-size-form text-center'>
                            {props.userStatement.name}
                        </div>
                        <div className='col-10 app-font l-color font-size-form text-center'>
                            Budget: ${props.userStatement.budget}
                        </div>
                    </div>
                    <div className='row pb-2' style={{justifyContent: 'flex-end'}}>
                        <div className='col-8 app-font l-color text-right'>
                            See more details...
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}