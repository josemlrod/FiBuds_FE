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
        url: `http://localhost:11235/statement/${id}`,
    });

    const {data: statementData,} = statementDataCall.data;

    return statementData;
};

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
    getUserByEmail,
    getStatementByID,
    updateUser,
};