/*Dependencies*/
import React from "react";
import { useState, useEffect, useCallback } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

/*Components*/
import Login from "./Login";
import Home from "./Home";
//import CalendarPage from "./CalendarPage";

import CalendarChart from "./CalendarChart";

import Profile from "./Profile";
import Workouts from "./Workouts";
import Session1 from "./Session1";
import Session2 from "./Session2";
import Session3 from "./Session3";
import Session4 from "./Session4";
import Session5 from "./Session5";
import Error from "./Error"

/*Stylesheets*/
import '../stylesheets/App.css';
import '../stylesheets/Errors.css';
import Custom from "./Custom";

function App() {
  // States to hold user and workout data acquired by fetches.
  const [workouts, setWorkoutsData] = useState([]);
  const [users, setUsersData] = useState([]);
  const [loggedInUser, setloggedInUser] = useState([]); 
  const [calendar, setCalendar] = useState([]); 
  const [refresh, setRefresh] = useState(false);
  
  let navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:9292/workouts")
    .then((r) => r.json())
    .then((data) => {
      console.log("WD: ", data)
      setWorkoutsData(data)
    })
  }, [refresh]);
  
  useEffect(() => {
    fetch("http://localhost:9292/users")
    .then((r) => r.json())
    .then((data) => setUsersData(data))
  }, []);

  // eslint-disable-next-line.
  const handleSubmit = useCallback(
    currentUser => {

    // Concat string with server URL + user input.
    let url = `http://localhost:9292/user/${currentUser}` 

    // Fetch with new URL, store user object in state, load Home component.
    fetch(url)
    .then((r) => r.json())
    .then((data) => {
      setloggedInUser(data)
      navigate("/home")
      })

  }, [navigate, setloggedInUser]);
  
  useEffect(() => {
    fetch(`http://localhost:9292/calendar/${loggedInUser.id}`)
    .then((r) => r.json())
    .then((data) => {
      setCalendar(data)
    })
     // eslint-disable-next-line 
  }, [loggedInUser, refresh]);

  // Display loading message until fetches have resolved.
  if(workouts.length === 0 && users.length === 0){
    <h1>Loading...</h1>
  };

  return (
    <Routes>
      <Route exact path="/home" element={<Home />}></Route>
      <Route exact path="/profile" element={<Profile loggedInUser={loggedInUser}/>}></Route>
      <Route exact path="/calendar" element={<CalendarChart loggedInUser={loggedInUser} calendar={calendar} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/workouts" element={<Workouts refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/session1" element={<Session1 workouts={workouts} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/session2" element={<Session2 workouts={workouts} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/session3" element={<Session3 workouts={workouts} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/session4" element={<Session4 workouts={workouts} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/session5" element={<Session5 workouts={workouts} refresh={refresh} setRefresh={setRefresh} />}></Route>
      <Route exact path="/custom" element={<Custom workouts={workouts} />}></Route>
      <Route exact path="/" element={<Login handleSubmit={handleSubmit} />}></Route>
      {/*If an incorrect path is given, load error message*/}
      {/*TO-DO: Add timeout so app redirects to profile screen after 2 seconds*/}
      <Route exact path="*" element={<Error />}></Route>
    </Routes>
  )
};

export default App;