import React from 'react';

export default props => {
    return(
        <>
            <div className='container'>
                <div className='col-12 n-backg-color rounded'>
                    <div className='row py-2' style={{justifyContent: 'flex-end'}}>
                        <div className='col-8 app-font l-color text-right'>
                            Completed / Incomplete
                        </div>
                    </div>
                    <div className='row py-2' style={{justifyContent: 'center'}}>
                        <div className='col-10 app-font l-color font-size-form text-center'>
                            Statement Name
                        </div>
                        <div className='col-10 app-font l-color font-size-form text-center'>
                            Budget: $0000
                        </div>
                    </div>
                    <div className='row py-2' style={{justifyContent: 'flex-end'}}>
                        <div className='col-8 app-font l-color text-right'>
                            See more details...
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}