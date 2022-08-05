/*Dependencies*/
import React from "react";

/*Components*/
import SessionTile from "./SessionTile";

/*Stylesheets*/
import '../stylesheets/Session.css';

// eslint-disable-next-line
{/*Displays SessionTile with filtered data for that day*/}
function Session5({ workouts, refresh, setRefresh }){

    let filteredData = workouts.slice(25, 31);

    function buildComponents(workout){
        return (
            <>
                <SessionTile key={workout.id} workout={workout} refresh={refresh} setRefresh={setRefresh}/>
            </>
        )
    }

    if(filteredData.length === 0){
        <h1>Loading...</h1>
    };

    return (
        <div id="session-page">
            <div id="exercises">
                {filteredData.map((workout) => buildComponents(workout))}
             </div>
        </div>
    )
}

export default Session5;