import React from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { GoogleOutlined } from '@ant-design/icons';

import './Login.scss';

function Login() {
    return (
        <div className="Login container-fluid">
            <div className="row justify-content-center align-items-center">
                <div className="col-md-6 card align-items-center py-3">
                    <h3 className="text-center mb-3">
                        Welcome to Chit-Chat!
                    </h3>
                    
                    <div 
                        className="btn btn-primary py-2"
                        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                        <GoogleOutlined /> Sign In with Google
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
