import './cssfile';
import React from "react";
import {
  BrowserRouter,
  Route,
  useEffect,
  useState,
  Login,
  Home,
  Register,
  Nav,
  Navbar,
  Forgot,
  Reset,
  Profile,
  HomeSite,
  ProtectedRoute,
  Card,
  SearchBar,
  MainHome
} from './imports';

function App() {
  let [searchParams, setSearchParams] = useState([]);

  let [user, setUser] = useState([]);
  let [login, setLogin] = useState(false);
  let [profile, setprofile] = useState(false);
  const [doctorData, setDoctorData] = useState([]); // the lifted state
    const sendDoctorDataParentHome = (index,searchParams) => {
        // the callback. Use a better name
        console.log("ParentHome | sendDoctorDataParentHome => ", index);
        console.log("ParentHome | sendSearchParamsParentHome => ", searchParams);
        // setDoctorData(index);
        setUser(index);
        setSearchParams(searchParams);
      };
  //start
  const sendDataToParent = (index) => { // the callback. Use a better name
    console.log("Index => ",index);
    setUser(index);
  };
  //end
  useEffect(() => {
    setUser([]);
    fetch('http://localhost:8000/api/patientUser', {
        method: 'GET',
        mode: 'cors',
        headers: {'Content-Type': 'application/json','Access-Control-Allow-Origin':'http://localhost:3000','Access-Control-Allow-Credentials':'true'},
        credentials: 'include',
    }).then( response => response.json())
    .then(user => {
        console.log(user);
        setUser(user);
    }
    )
    .catch(error => {
                console.log(error);
                setUser([]);
    });
    

},[login,profile]);

  return (
    <BrowserRouter>
        <Navbar user={user} setUser={setUser} setLogin={() => setLogin(false)}/>  
        <Route path="/" exact component={() => <HomeSite sendDoctorDataParentHome={sendDoctorDataParentHome}/>}/>
        {/* <Route path="/home" component={() => <Home user={user} searchParams={searchParams} />}/> */}
        <Route path="/home" exact component={() => <MainHome user={user} searchParams={searchParams} />}/>
        <Route path="/login" component={() => <Login setUser={setUser} setLogin={() => setLogin(true)}/>}/>
        <Route path="/register" component={Register}/>
        <Route path="/forgot" component={Forgot}/>
        <Route path="/reset/:token" component={Reset}/>
        <ProtectedRoute path="/profile" component={() => <Profile user={user} setprofile={() => setprofile(true)}/>}/>
        <Route path="/doctors/:id" component={Card}/>
    </BrowserRouter>
  );
}

export default App;
