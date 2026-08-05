import express from "express";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { getAnalyticsController, getDailySalesController } from "../controller/analytic.controller.js";

const analyticRoute = express.Router()


analyticRoute.get('/getData', protectRoute, adminRoute, getAnalyticsController)
analyticRoute.get('/dailySales', protectRoute, adminRoute, getDailySalesController)

export default analyticRoute