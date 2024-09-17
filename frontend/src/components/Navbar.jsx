import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { useLogout } from "../hooks/useLogout";
import { malaysiaStatesCoordinates as myLocation  } from "../assets/myState";

export const Navbar = () => {
  const [myState, setMyState] = useState("Kuala Lumpur")
  const [weather, setWeather] = useState("clear sky")
  const [weatherIcon, setWeatherIcon] = useState("01d")
  const [showModal, setShowModal] = useState(false)
  const { user } = useAuthContext();
  const { logout } = useLogout();


  //send location to server and get data from openweather
  const getWeather = async () => {
    try{
      const response = await fetch(`/api/v1/weather?lat=${myLocation[myState].latitude}&lon=${myLocation[myState].longitude}`,{
        method : "GET",
        headers : {"Content-Type" : "application/json"}
      });
      const json = await response.json()
      if(response.ok){
        setWeather(json.weather[0].description)
        setWeatherIcon(json.weather[0].icon)
      }else{
        throw new Error({Message : "Bad request"})
      }

    }catch(e){
      console.log(e)
    }
  }

  //location selection
  const handleMyState = async(e) => {
    e.preventDefault()
    setMyState(e.target.value)
  }

  useEffect(()=> {
  getWeather()

  },[myState,getWeather])

  return (
    <header>
      <div className="container">
        <Link to="/">
          <h1 className="google-style">
            <span className="blue">T</span>
            <span className="red">o</span>
            <span className="yellow">d</span>
            <span className="blue">o</span>
          </h1>
        </Link>
        <div className="weather">
          <img src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`} alt="image" />
          <div>
            <div>{weather}</div>
            <select value={myState} onChange={(e) => handleMyState(e)}>
              {Object.keys(myLocation).map((state)=> (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <div></div>
          </div>
        </div>
        <nav>
          {user && (
            <div className={showModal ? "user show__menu" : "user"}>
              <span>{user.username}</span>
              <button onClick={()=> {
                logout()
                setShowModal(false)
                }}>Log out</button>
            </div>
          )}
          {!user && (
            <div className={showModal ? "user show__menu" : "user "}>
              <Link to="/login" onClick={()=> {
                setShowModal(false)
                }}>Login</Link>
              <Link to="/signup" onClick={()=> {
                setShowModal(false)
                }}>Signup</Link>
            </div>
          )}
          <i onClick={()=> setShowModal(!showModal)} className={`bx listing bx-md ${showModal ? "bx-list-minus" : "bx-list-ul"}`}></i>
        </nav>
      </div>
    </header>
  );
};
