/*Dependencies*/
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

/*Stylesheets*/
import '../stylesheets/Workouts.css';

/*Media*/
import logo from "../images/logo.png"
import background from "../images/workout-background.png"

// eslint-disable-next-line
{/*Displays img, list of weeks as btns, a custom btn to add new workout*/}
function Workouts({ refresh, setRefresh }){

    const [open, setIsOpen] = useState(false);
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [info, setInfo] = useState("");
    const [muscle, setMuscle] = useState("");
    const [difficulty, setDifficulty] = useState("");

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        setIsOpen(false);

        fetch("http://localhost:9292/workouts/addworkout", {
            method: "POST",
            body: JSON.stringify({
                name: name,
                reps: reps,
                sets: sets,
                info: info,
                muscle: muscle,
                difficulty: difficulty
            }),
            headers: {
                "Content-type": "application/json"
            },
        })

        // Reset form after patch
        setName("");
        setReps(0);
        setSets(0);
        setInfo("");
        setMuscle("");
        setDifficulty("");

        setRefresh(!refresh)
    };

    return (
        <div id="page-container">
            <img id="workout-img" src={ background } alt="ropes" />
            <div id="content">
                <img id="logo" src={ logo } alt="logo" />
                {
                    open ? (
                    <form id="-workout-form-container" onSubmit={(e) => handleSubmit(e)}>
                        <div id="form-inputs">
                            <input className="f-inputs" type="text" placeholder="The name of the exercise" value={name} onChange={(e) => setName(e.target.value)}/>
                            <input className="f-inputs" type="text" placeholder="The amount of reps" value={reps} onChange={(e) => setReps(e.target.value)}/>
                            <input className="f-inputs" type="text" placeholder="The amount of sets" value={sets} onChange={(e) => setSets(e.target.value)}/>
                            <input className="f-inputs" type="text" placeholder="Some details abut the exercise" value={info} onChange={(e) => setInfo(e.target.value)}/>
                            <input className="f-inputs" type="text" placeholder="What is the main muscle group" value={muscle} onChange={(e) => setMuscle(e.target.value)}/>
                            <input className="f-inputs" type="text" placeholder="How difficult is this exercise" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
                        </div>
                        <div id="form-btn-container" >
                            <button id="form-sub-btn" type="submit">ADD WORKOUT</button>
                            <button id="form-disc-btn" onClick={() => setIsOpen(false)}>DISCARD WORKOUT</button> 
                        </div>
                    </form> 
                    ) : (
                <div id="btn-container">
                    <button className="custom-btn" onClick={() => setIsOpen(true)}>Add Workout</button>
                    <button className="custom-btn" onClick={() => {navigate("/custom")}}>Custom Workouts</button>
                    <button className="sessions-btns" onClick={() => {navigate("/session1")}}>Day One</button>
                    <button className="sessions-btns" onClick={() => {navigate("/session2")}}>Day Two</button>
                    <button className="sessions-btns" onClick={() => {navigate("/session3")}}>Day Three</button>
                    <button className="sessions-btns" onClick={() => {navigate("/session4")}}>Day Four</button>
                    <button className="sessions-btns" onClick={() => {navigate("/session5")}}>Day Five</button>
                </div>
            )}
            </div>
        </div>
    )
}

export default Workouts;