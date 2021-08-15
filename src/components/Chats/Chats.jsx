import React, { useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from '../../firebase';

import { useAuth } from '../../context/AuthContext';
import axios from 'axios';

function Chats() {
    const history = useHistory();
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const didMountRef = useRef(false);
    
    // Log Out
    const handleLogout = async () => {
        await auth.signOut();
        history.push('/');
    }

    // user photo
    const getFile = async(url) => {
        const res = await fetch(url);
        const data = await res.blob(); // .blob contains our image

        // returning image as file when we create a new user in chat engine
        return new File([data], "userPhoto.jpg", { type: 'image/jpeg' }); 
    }

    useEffect(() => {
        if (!didMountRef.current) {
            didMountRef.current = true
      
            if (!user || user === null) {
              history.push("/")
              return
            }
        
            axios.get("https://api.chatengine.io/users/me/", {
                headers: {
                    "project-id": process.env.REACT_APP_CHAT_ENGINE_ID,
                    "user-name": user.email,
                    "user-secret": user.uid
                }
            })
            .then(() => {
                setLoading(false);
            })
            .catch(() => {
                // if user of some credentials not found in chat engine, create one
                let formData = new FormData();
                formData.append('email', user.email);
                formData.append('username', user.email);
                formData.append('secret', user.uid);

                getFile(user.photoURL)
                    .then((avatar) => {
                        formData.append('avatar', avatar, avatar.name);
                        axios.post('https://api.chatengine.io/users/',
                            formData,
                            { headers: {
                                "private-key": process.env.REACT_APP_CHAT_ENGINE_KEY
                            } }
                        )
                        .then(() => {setLoading(false);})
                        .catch((err) => {console.log(err)});
                    })
            });

        }
    }, [ user, history ]);

    if(!user || loading) return 'Loading....';

    return (
        <div className="chat-page">
            <div className="nav-bar">
                <div className="logo-tab">
                    Chit-Chat
                </div>
                <div 
                    className="logout-tab"
                    onClick={handleLogout}
                >
                    Log Out
                </div>
            </div>

            <ChatEngine 
                height="calc(100vh - 66px)"
                projectID={process.env.REACT_APP_CHAT_ENGINE_ID}
                userName={user.email}
                userSecret={user.uid}
                offset={6}
            />
        </div>
    )
}

export default Chats
