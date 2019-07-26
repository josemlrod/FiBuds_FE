import React from 'react';

export default props => {
    return(
        <>
            <li className="list-group-item w-backg-color">{props.name} ${props.amount}</li>
        </>
    )
}