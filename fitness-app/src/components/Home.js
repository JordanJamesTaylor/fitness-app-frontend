/*Dependencies*/
import React from "react";
import { useNavigate } from "react-router-dom";

/*Components*/

/*Stylesheets*/
import '../stylesheets/Home.css';

/*Media*/
import video from "../media/fitnessVideo.mp4"

// eslint-disable-next-line
{/*Displays 3 btns for difficulty levels*/}
function Home(){

    let navigate = useNavigate();

    return (
        <div id="home-page-container">
            <video autoPlay muted loop id="workout-video">
                <source src={ video } type="video/mp4" />
            </video>
            <div id="btns-container">
                <button className="nav-buttons" onClick={() => {navigate("/workouts");}}>WORKOUTS</button>
                <button className="nav-buttons" onClick={() => {navigate("/profile");}}>PROFILE</button>
                <button className="nav-buttons" onClick={() => {navigate("/calendar");}}>CALENDAR</button>
            </div>
        </div>
    )
}

export default Home;