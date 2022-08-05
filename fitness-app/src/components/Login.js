/*Dependencies*/
import React from "react";
import { useState } from "react";

/*Components*/

/*Stylesheets*/
import '../stylesheets/Login.css';

/*Media*/
import video from "../media/fitnessVideo.mp4"
import logo from "../images/logo.png"

// eslint-disable-next-line
{/*Displays video and login btn. Login in will be based on user's name (not a real login)*/}
function Login({ handleSubmit }){

    const [currentUser, setCurrentUser] = useState("");

    return (
        <div id="login-page-container">
            <video autoPlay muted loop id="workout-video">
                <source src={ video } type="video/mp4" />
            </video>
            <div id="login-sub-container">
                <img id="logo" src={ logo } alt="logo" />
                <input 
                    id="login-text-area" 
                    type="text" 
                    name="username" 
                    placeholder="Enter your username..." 
                    value={currentUser} 
                    onChange={(e) => setCurrentUser(e.target.value)}
                />
                <input 
                    id="login-btn" 
                    type="submit" 
                    value="ENTER"
                    onClick={() => handleSubmit(currentUser)}
                />
            </div>
        </div>
    )
};

export default Login;
