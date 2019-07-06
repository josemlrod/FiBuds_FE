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

const getUserByEmail = email => axios({
    method: 'get',
    url: `http://localhost:11235/user/email/${email}`,
});

export {
    createUser,
    getUserByEmail,
}