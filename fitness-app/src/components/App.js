/*Dependencies*/
import React from "react";
import { useState, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

/*Components*/
import Calendar from "./Calendar";
import Difficulty from "./Difficulty";
import Profile from "./Profile";
import Session from "./Session";
import Weeks from "./Weeks";
import Login from "./Login";
import Error from "./Error"

/*Stylesheets*/
import '../stylesheets/App.css';
import '../stylesheets/Errors.css';


function App() {

  /*States to hold user and workout data acquired by fetches*/
  const [workouts, setWorkoutData] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:9292/workouts")
    .then((r) => r.json())
    .then((data) => setWorkoutData(data))
  }, []);

  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then((r) => r.json())
    .then((data) => setUsers(data))
  }, []);

  /*Display loading message until fetches have resolved*/
  if (workouts.length === 0 && users.length === 0){
    <h1>Loading...</h1>
  };

  return (
    <Switch>
      <Route exact path="/calendar">
        <Calendar />
      </Route>
      <Route exact path="/profile">
        <Profile users={users} />
      </Route>
      <Route exact path="/difficulty">
        <Difficulty />
      </Route>
      <Route exact path="/weeks">
        <Weeks />
      </Route>
      <Route exact path="/session">
        <Session workouts={workouts} />
      </Route>
      <Route exact path="/">
        <Login />
      </Route>
      {/*If an incorrect path is given, load error message*/}
      {/*TO-DO: Add timeout so app redirects to profile screen after 2 seconds*/}
      <Route path="*">
        <Error />
      </Route>
    </Switch>
  );
}

export default App;
