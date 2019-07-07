import axios from 'axios';

const createUser = (
    fName, lName, email, firebase_token, avatar_url, income
) => axios({
    method: 'post',
    url: 'http://localhost:11235/user/',
    data: {
        first_name: fName,
        last_name: lName,
        email,
        firebase_token,
        avatar_url,
        income
    },
});

// const getUserByEmail = email => axios({
//     method: 'get',
//     url: `http://localhost:11235/user/email/${email}`,
// });

const getUserByEmail = async email => {
    const userDataCall = await axios({
        method: 'get',
        url: `http://localhost:11235/user/email/${email}`,
    });

    const userStatementCall = await axios({
        method: 'get',
        url: `http://localhost:11235/statement/detailed/${email}`,
    })

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