import axios from "axios"

export const getUserOrders = async () => {
    const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/order/getUserOrders`,
        {
            headers: { "Content-Type": "Application/json" },
            withCredentials: true
        }
    )
    return res.data
}