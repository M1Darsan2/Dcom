import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { getUserOrders } from "../controller/order.controller.js";


const orderRoute = express.Router()

orderRoute.get('/getUserOrders', protectRoute, getUserOrders)

export default orderRoute