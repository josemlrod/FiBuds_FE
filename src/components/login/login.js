import React, {useState, useContext,} from 'react';
import {Redirect,} from 'react-router-dom';
import {AuthContext,} from '../../store';
import firebase from '../../services/firebase';

export default props => {
    const [email, setEmail,] = useState();
    const [passW, setPassW,] = useState();
    const [err, setErr,] = useState();
    const [authUser,] = useContext(AuthContext);
    
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassW(e.target.value);
    const handleSubmit = _ => {
        firebase.auth().signInWithEmailAndPassword(email, passW)
          .then(_ => props.history.push('/'))
          .catch(err => {
            const {message,} = err;
            setErr(message);
          });
    };

    const renderLogin = _ => {
        if (err) {
            return(
                <>
                    <div class="alert alert-danger" role="alert">
                            {err}
                    </div>
                    <div className='container vertically-al' style={{height: '80vh'}}>
                        <div className='row'>
                            <div className='col-12 text-center'>
                                    <h1 className='l-color app-font big-title'>
                                        LOG IN!
                                    </h1>
                            </div>
                            <div className='col-12 text-center'>
                                <form>
                                    <div className="form-group">
                                        <input type="email" className="form-control" id="InputEmail" 
                                            aria-describedby="emailHelp" placeholder="Email" onChange={updateEmail} />
                                    </div>
                                    <div className="form-group">
                                        <input type="password" className="form-control" id="exampleInputPassword1" 
                                            placeholder="Password" onChange={updatePassword} />
                                    </div>
                                    <button type="submit" className="btn b-backg-color l-color text-center"
                                        onClick={handleSubmit}>Submit</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </>
            )
        } else if (authUser.user) {
            return <Redirect to='/' />
        }  else {
            return(
                <div className='container vertically-al' style={{height: '80vh'}}>
                    <div className='row'>
                        <div className='col-12 text-center'>
                                <h1 className='l-color app-font big-title'>
                                    LOG IN!
                                </h1>
                        </div>
                        <div className='col-12 text-center'>
                            <form>
                                <div className="form-group my-3">
                                    <input type="email" className="form-control" id="InputEmail" 
                                        aria-describedby="emailHelp" placeholder="Email" onChange={updateEmail} />
                                </div>
                                <div className="form-group my-3">
                                    <input type="password" className="form-control" id="exampleInputPassword1" 
                                        placeholder="Password" onChange={updatePassword} />
                                </div>
                                <button type="submit" className="btn b-backg-color l-color text-center app-font font-size-form"
                                    onClick={handleSubmit}>Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )
        }
    }

    return(
        renderLogin()
    )
};