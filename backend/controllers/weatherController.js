import axios from "axios"
import {responseList} from "../config/responseList.js"
import dotenv from "dotenv"

dotenv.config()
const api = process.env.API_KEY


//get weather data from openweather
export const getWeather = async (req, res) => {
    const {lat, lon} = req.query
    try{
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api}`);
        if(response.status === 200){
            res.json(response.data)
        }else{
            res.status(400).json({Message : responseList.BAD_REQUEST})
        }

    }catch(e){
        console.log(e)
        res.status(500).json({Message : "SERVER ERROR"})
    }
}