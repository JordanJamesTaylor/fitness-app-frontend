/*Dependencies*/
import React, { useState } from "react";

/*Components*/

/*Stylesheets*/
import '../stylesheets/SessionTile.css';

// eslint-disable-next-line
{/*Displays reps, sets, name, info, targeted muscle, images for each exercise*/}
function SessionTile({ workout, refresh, setRefres }){

    const [open, setIsOpen] = useState(false);
    // eslint-disable-next-line
    const [sessPage, setSessPage] = useState(false);
    const [name, setName] = useState("");
    const [reps, setReps] = useState("");
    const [sets, setSets] = useState("");
    const [info, setInfo] = useState("");
    const [muscle, setMuscle] = useState("");
    const [difficulty, setDifficulty] = useState("");

    function handleEdit(e){
        e.preventDefault();
        setIsOpen(true);

    }

    function backendEdit(e){
        e.preventDefault()

        console.log("EW-ID: ", workout.id)

        fetch(`http://localhost:9292/workouts/editworkout/${workout.id}`, {
            method: "PATCH",
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

        setIsOpen(false)
    }

    function handleDelete(){

       fetch(`http://localhost:9292/workouts/deleteworkout/${workout.id}`, { method: "DELETE"})
       .catch(console.log("UNABLE TO DELETE WORKOUT"))

       setSessPage(!refresh)
    };

    return (
        <div id="workout-tile">
            { open ? (
                <form id="-workout-form-container" onSubmit={(e) => backendEdit(e)}>
                <div id="form-inputs">
                    <input className="f-inputs" type="text" placeholder="The name of the exercise" value={name} onChange={(e) => setName(e.target.value)}/>
                    <input className="f-inputs" type="text" placeholder="The amount of reps" value={reps} onChange={(e) => setReps(e.target.value)}/>
                    <input className="f-inputs" type="text" placeholder="The amount of sets" value={sets} onChange={(e) => setSets(e.target.value)}/>
                    <input className="f-inputs" type="text" placeholder="Some details abut the exercise" value={info} onChange={(e) => setInfo(e.target.value)}/>
                    <input className="f-inputs" type="text" placeholder="What is the main muscle group" value={muscle} onChange={(e) => setMuscle(e.target.value)}/>
                    <input className="f-inputs" type="text" placeholder="How difficult is this exercise" value={difficulty} onChange={(e) => setDifficulty(e.target.value)}/>
                </div>
                <div id="form-btn-container" >
                    <button oid="form-sub-btn" type="submit">UPDATE WORKOUT</button>
                    <button id="form-disc-btn" onClick={() => setIsOpen(true)}>DISCARD UPDATES</button> 
                </div>
            </form> 
            ) : (
            <>
            <div id="wt-btn">
                <button id="ew-btn" onClick={((e) => handleEdit(e))}>EDIT WORKOUT</button>
                <button id="dw-btn" onClick={(() => handleDelete())}>DELETE WORKOUT</button>
            </div>
            <div id="rs-container">
                <h2>REPS | { workout.reps }</h2>
                <h2>/</h2>
                <h2>SETS | { workout.sets }</h2>
            </div>
            <div id="info-container">
                <p>{ workout.name }</p>
                <p>{ workout.info }</p>
                <p>{ workout.muscle }</p>
            </div>
            </>
        )}
        </div>
    )
}

export default SessionTile;
/*
                <div id="wt-btn">
                    <button id="ew-btn" onClick={((e) => handleEdit(e.target.value))}>EDIT WORKOUT</button>
                    <button id="dw-btn" onClick={(() => handleDelete())}>DELETE WORKOUT</button>
                </div>
                <div id="rs-container">
                    <h2>REPS | { workout.reps }</h2>
                    <h2>/</h2>
                    <h2>SETS | { workout.sets }</h2>
                </div>
                <div id="info-container">
                    <p>{ workout.name }</p>
                    <p>{ workout.info }</p>
                    <p>{ workout.muscle }</p>
                </div>
                */