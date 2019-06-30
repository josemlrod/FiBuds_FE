import React, {useState,} from 'react';
import firebase from '../../services/firebase';
import {createUser,} from '../../services/api';

export default props => {
    const [fName, setFName,] = useState('');
    const [lName, setLName,] = useState('');
    const [income, setIncome,] = useState('');
    const [email, setEmail,] = useState('');
    const [passW, setPassW,] = useState('');
    const [err, setErr,] = useState('');
    
    const handleFName = e => setFName(e.target.value);
    const handleLName = e => setLName(e.target.value);
    const handleIncome = e => setIncome(e.target.value);
    const handleEmail = e => setEmail(e.target.value);
    const handlePassW = e => setPassW(e.target.value);
    
    const handleSubmit = e => {
        e.preventDefault();
        const file = e.target.form[5].files[0];
        let token = ''
        firebase.auth().createUserWithEmailAndPassword(email, passW)
          .then((response) => {
            token = response.user.l;
            const root = firebase.storage().ref(`/images/${email}`);
            const newImage = root.child(file.name)
            return newImage.put(file);
          })
          .then(snapshot => snapshot.ref.getDownloadURL())
          .then(avatar_url => createUser(fName, lName, email, token, avatar_url, income))
          .then(_ => {
            props.history.push('/');
          })
          .catch(err => {
            const {msg,} = err;
            setErr(msg);
          });
    };

    return(
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
    );
};