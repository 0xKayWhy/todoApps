import { Router } from "express";
import {getWeather} from "../controllers/weatherController.js"


const route = Router()

route.get("/", getWeather);

export default route

