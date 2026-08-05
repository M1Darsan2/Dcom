import {Order} from "../models/order.model.js"


export const getUserOrders = async (req, res) => {
    try {
        const userId = req.id

        const orders = await Order.find({ user: userId })
            .populate('products.product', 'name image price category')
            .sort({ createdAt: -1 })

        return res.status(200).json({
            message: "Orders fetched successfully",
            orders
        })
    } catch (error) {
        console.log(`error from getUserOrders, ${error}`)
        return res.status(500).json({ message: "Something went wrong" })
    }
}