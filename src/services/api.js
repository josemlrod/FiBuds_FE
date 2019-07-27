import axios from 'axios';

const createUser = (
    fName, lName, email, firebase_token, avatar_url, income
) => axios({
    method: 'post',
    url: 'https://fibuds.herokuapp.com/user/',
    data: {
        first_name: fName,
        last_name: lName,
        email,
        firebase_token,
        avatar_url,
        income
    },
});

const createStatement = (name, budget, user_id, saved) => axios({
    method: 'post',
    url: 'https://fibuds.herokuapp.com/statement/',
    data: {
        name,
        budget,
        user_id, 
        saved,
    },
});

const createExpense = (fixed, amount, user_id, statement_id, name) => axios({
    method: 'post',
    url: 'https://fibuds.herokuapp.com/expense/',
    data: {
        fixed,
        amount,
        user_id, 
        statement_id, 
        name,
    },
});

const getUserByEmail = async email => {
    const userDataCall = await axios({
        method: 'get',
        url: `https://fibuds.herokuapp.com/user/email/${email}`,
    });

    const userStatementCall = await axios({
        method: 'get',
        url: `https://fibuds.herokuapp.com/statement/all/${email}`,
    });

    const {data: userData,} = userDataCall.data;
    const {data: userStatements,} = userStatementCall.data;
    
    return {
        userData,
        userStatements,
    };
};

const getStatementByID = async id => {
    const statementDataCall = await axios({
        method: 'get',
        url: `https://fibuds.herokuapp.com/statement/${id}`,
    });

    const {data: statementData,} = statementDataCall.data;

    return statementData;
};

const getStatementExpenses = async (user_id, statement_id) => axios({
    method: 'get',
    url: `https://fibuds.herokuapp.com/expense/all/${user_id}/${statement_id}`,
});

const updateUser = (
    fName, lName, email, firebase_token, avatar_url, income, id
) => axios({
    method: 'put',
    url: 'https://fibuds.herokuapp.com/user/',
    data: {
        first_name: fName,
        last_name: lName,
        email,
        firebase_token,
        avatar_url,
        income,
        id,
    },
});

export {
    createUser,
    createStatement,
    createExpense,
    getUserByEmail,
    getStatementByID,
    getStatementExpenses,
    updateUser,
};