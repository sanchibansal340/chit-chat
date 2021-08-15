import React from 'react';
import { auth } from '../../firebase';
import firebase from 'firebase';
import { GoogleOutlined } from '@ant-design/icons';

import './Login.scss';
import LandingImg from '../../assets/images/landing.jpg';

function Login() {
    return (
        <div className="Login container-fluid pt-5">
            <div className="row">
                <div className="col-md-6 my-auto text-center">
                    <h3 className="mb-1">
                        Welcome to Chit-Chat!
                    </h3>

                    <h5 className="text-muted">
                        For those who love to talk, but just behind the screens :)
                        <br /><br />
                        Now connect with your loved ones with just one click! 
                    </h5>
                    
                    <div 
                        className="btn btn-warning py-2 mt-4"
                        onClick={() => auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())}
                    >
                        <GoogleOutlined /> Sign In with Google
                    </div>
                </div>
                <div className="col-md-6 text-center py-3 ">
                    <img src={LandingImg} alt="Landing Chatting" className="img-fluid" />
                </div>
            </div>
        </div>
    )
}

export default Login
