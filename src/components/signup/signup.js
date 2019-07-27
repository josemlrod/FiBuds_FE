/*
    TODO:
        1. redesign signup
        2. make sure html matches on the err case as well
*/

import React, {useState, useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext,} from '../../store';
import firebase from '../../services/firebase';
import {createUser,} from '../../services/api';

export default props => {
    const [fName, setFName,] = useState('');
    const [lName, setLName,] = useState('');
    const [income, setIncome,] = useState('');
    const [email, setEmail,] = useState('');
    const [passW, setPassW,] = useState('');
    const [err, setErr,] = useState('');
    const [authUser,] = useContext(AuthContext);

    const handleFName = e => setFName(e.target.value);
    const handleLName = e => setLName(e.target.value);
    const handleIncome = e => setIncome(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handlePassW = e => setPassW(e.target.value);
    
    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const file = e.target.form[5].files[0];
            const createUserFB = await firebase.auth().createUserWithEmailAndPassword(email, passW);
            const {l: token,} = createUserFB.user;
            const root = firebase.storage().ref(`/images/${email}`);
            const newImage = root.child(file.name)
            const snapshot = await newImage.put(file);
            const avatar_url = await snapshot.ref.getDownloadURL();
            const createUserCall = await createUser(fName, lName, email, token, avatar_url, income);
            props.history.push('/');

        } catch(err) {
            const {message,} = err;
            setErr(message);
        };
    };

    const renderSignUp = _ => {
        if (err) {
            return(
                <>
                    <div class="alert alert-danger" role="alert">
                        {err}
                    </div>
                    <div className='container my-4'>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                <h1 className='l-color'>
                                    Sign Up!
                                </h1>
                            </div>
                            <div className='col-12'>
                                <form>
                                    <div className="form-row my-2">
                                        <div className="col-6 my-2">
                                            <label htmlFor="inputName" className='l-color'>First Name</label>
                                            <input type="text" name='fName' className="form-control" 
                                                placeholder="First name" onChange={handleFName} />
                                        </div>
                                        <div className="col-6 my-2">
                                            <label htmlFor="inputName" className='l-color'>Last Name</label>
                                            <input type="text" name='lName' className="form-control" 
                                                placeholder="Last name" onChange={handleLName} />
                                        </div>
                                        <div className="col my-2">
                                            <label htmlFor="inputIncome" className='l-color'>Income</label>
                                            <input type="text" name='income' className="form-control" 
                                                placeholder="Income" onChange={handleIncome} />
                                        </div>
                                    </div>
                                    <div className="form-row my-2">
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputEmail4" className='l-color'>Email</label>
                                            <input type="email" name='email' className="form-control" 
                                                id="inputEmail4" placeholder="Email" onChange={handleEmail} />
                                        </div>
                                        <div className="form-group col-md-6">
                                            <label htmlFor="inputPassword4" className='l-color'>Password</label>
                                            <input type="password" name='passW' className="form-control" 
                                                id="inputPassword4" placeholder="Password" onChange={handlePassW} />
                                        </div>
                                        <div className="custom-file col-md-6">
                                            <input type="file" className="custom-file-input" id="customFile"/>
                                            <label className="custom-file-label" htmlFor="customFile">Choose Profile Picture</label>
                                        </div>
                                        <div className='col-12 text-right my-2'>
                                            <button type="submit" className="btn b-backg-color l-color text-center"
                                                onClick={handleSubmit}>Submit</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (authUser.loadedUserData) {
            return <Redirect to='/' />
        } else {
            return(
            <div className='container my-5 py-5'>
                    <div className='row'>
                        <div className='col-12 text-center'>
                            <h1 className='l-color app-font big-title'>
                                Sign Up!
                            </h1>
                        </div>
                        <div className='col-12'>
                            <form>
                                <div className="form-row my-2">
                                    <div className="col-6 my-2">
                                        <label htmlFor="inputName" className='l-color app-font font-size-form'>First Name</label>
                                        <input type="text" name='fName' className="form-control" 
                                            placeholder="First name" onChange={handleFName} />
                                    </div>
                                    <div className="col-6 my-2">
                                        <label htmlFor="inputName" className='l-color app-font font-size-form'>Last Name</label>
                                        <input type="text" name='lName' className="form-control" 
                                            placeholder="Last name" onChange={handleLName} />
                                    </div>
                                    <div className="col my-2">
                                        <label htmlFor="inputIncome" className='l-color app-font font-size-form'>Income</label>
                                        <input type="text" name='income' className="form-control" 
                                            placeholder="Income" onChange={handleIncome} />
                                    </div>
                                </div>
                                <div className="form-row my-2">
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputEmail4" className='l-color app-font font-size-form'>Email</label>
                                        <input type="email" name='email' className="form-control" 
                                            id="inputEmail4" placeholder="Email" onChange={handleEmail} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <label htmlFor="inputPassword4" className='l-color app-font font-size-form'>Password</label>
                                        <input type="password" name='passW' className="form-control" 
                                            id="inputPassword4" placeholder="Password" onChange={handlePassW} />
                                    </div>
                                    <div className="custom-file col-md-6">
                                        <input type="file" className="custom-file-input app-font font-size-form" id="customFile"/>
                                        <label className="custom-file-label" htmlFor="customFile">Choose Profile Picture</label>
                                    </div>
                                    <div className='col-12 text-right my-2'>
                                        <button type="submit" className="btn b-backg-color l-color text-center app-font font-size-form"
                                            onClick={handleSubmit}>Submit</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            );
        };
    };

    return(
        renderSignUp()
    );
};