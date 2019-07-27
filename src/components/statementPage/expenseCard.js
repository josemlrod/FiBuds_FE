import React from 'react';

export default props => {
    return(
        <>
            <li className="list-group-item w-backg-color">
                <div className='col-6 d-inline-block text-left app-font g-color reg-font-size'>
                    {props.name}
                </div>
                <div className='col-6 d-inline-block text-right app-font g-color reg-font-size'>
                    ${props.amount}
                </div>
            </li>
        </>
    )
}