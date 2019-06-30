import React, {useState,} from 'react';
import firebase from '../../services/firebase';

export default props => {
    const [email, setEmail,] = useState('');
    const [passW, setPassW,] = useState('');
    const [err, setErr,] = useState('');
    
    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassW(e.target.value);
    const handleSubmit = e => {
        firebase.auth().signInWithEmailAndPassword(email, passW)
          .then(console.log)
          .catch(err => {
            const {msg,} = err;
            setErr(msg);
          });
    };

    return(
        <div className='container vertically-al' style={{height: '80vh'}}>
            <div className='row'>
                <div className='col-12 text-center'>
                        <h1 className='l-color' style={{fontSize: 64}}>
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
    )
}