import React, {useEffect,} from 'react';

export default props => {
    const {expenses, statement,} = props;
    const statementBudget = parseInt(statement.budget, 10)
    let moneySpent = 0
    
    if (expenses.fixed && expenses.other) {
        for(let expense of expenses.fixed) moneySpent += parseInt(expense.amount, 10);
        for(let expense of expenses.other) moneySpent += parseInt(expense.amount, 10);
    };

    const percentageCalc = (budget, totalSpent) => ((budget - totalSpent) * 100) / budget;
    const percentageUsed = percentageCalc(statementBudget, moneySpent).toString().slice(0, 5);

    return(
        <>
            <div className='col-12'>
                <div className="progress">
                    <div className="progress-bar progress-bar-striped progress-bar-animated b-backg-color" 
                        role="progressbar" aria-valuenow='50'
                        aria-valuemin="0" aria-valuemax="100" style={{width: `${percentageUsed}%`}}>
                        {percentageUsed}%
                    </div>
                </div>
            </div>
        </>
    )
}