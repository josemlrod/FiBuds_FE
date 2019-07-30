import React from 'react';

export default props => {
    const {expenses, statement,} = props;
    const statementBudget = parseInt(statement.budget, 10)
    let moneySpent = 0
    
    if (expenses.fixed && expenses.other) {
        for(let expense of expenses.fixed) moneySpent += parseInt(expense.amount, 10);
        for(let expense of expenses.other) moneySpent += parseInt(expense.amount, 10);
    };

    const percentageCalc = (budget, totalSpent) => (totalSpent * 100) / budget;
    const percentageUsed = percentageCalc(statementBudget, moneySpent).toString().slice(0, 5);

    return(
        <>
            <div className='col-12 m-2'>
                <h2 className='text-center app-font n-color'>💰 Used:</h2>
            </div>
            <div className='col-12'>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated g-backg-color n-color" 
                        role="progressbar" aria-valuenow='50'
                        aria-valuemin="0" aria-valuemax="100" style={{width: `${percentageUsed}%`}}>
                        {percentageUsed}%
                    </div>
                </div>
            </div>
            {/* <div className='col-12 text-center'>
                <div className='col-3 mr-3 app-font rounded d-inline-block text-wrap l-color n-backg-color progressBar-txt'>
                    Budget: ${statementBudget}
                </div>
                <div className='col-3 mr-3 app-font rounded d-inline-block text-wrap l-color n-backg-color progressBar-txt'>
                    Rem Bal: ${statementBudget - moneySpent}
                </div>
                <div className='col-3 rounded app-font d-inline-block text-wrap l-color n-backg-color progressBar-txt'>
                    Spent: ${moneySpent}
                </div>
            </div> */}
        </>
    )
}