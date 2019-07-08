import axios from 'axios';

const createUser = (
    fName, lName, email, firebase_token, avatar_url, income
) => axios({
    method: 'post',
    url: 'http://fibuds.herokuapp.com/user/',
    data: {
        first_name: fName,
        last_name: lName,
        email,
        firebase_token,
        avatar_url,
        income
    },
});

const getUserByEmail = async email => {
    const userDataCall = await axios({
        method: 'get',
        url: `http://fibuds.herokuapp.com/user/email/${email}`,
    });

    const userStatementCall = await axios({
        method: 'get',
        url: `http://fibuds.herokuapp.com/statement/detailed/${email}`,
    });

    const {data: userData,} = userDataCall.data;
    const {data: userStatements,} = userStatementCall.data;
    
    return {
        userData,
        userStatements,
    };
};

export {
    createUser,
    getUserByEmail,
}