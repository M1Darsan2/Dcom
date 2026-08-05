import { Order } from "../models/order.model.js"
import { Product } from "../models/product.model.js"
import { User } from "../models/user.model.js"

export  const getData = async()=>{
    const totalUser = await User.countDocuments()
    const totalProducts= await Product.countDocuments()

    const salesData= await Order.aggregate([
        {
            $group:{
                _id:null, 
                totalSales : {$sum:1},
                totalRevenue:{$sum:"$totalAmount" }

            }
        }
    ])
    const {totalSales, totalRevenue} = salesData[0]|| {totalSales:0, totalRevenue:0}


    return {
        users:totalUser,
        products:totalProducts,
        totalSales,
        totalRevenue,
    }
}



export const getAnalyticsController=async(req,res)=>{
    try {
        const data = await getData()
        return res.status(200).json(data)
    } catch (error) {
        console.log(`error from getAnalutics controller, ${error}`)
    }
}


export const getDailySalesData = async(startDate, endDate)=>{
    try {
        const dailySales = await Order.aggregate([
            {
                $match:{
                    createdAt:{
                        $gte:startDate,
                        $lte:endDate
                    }
                }
            },
            {
                $group:{
                    _id:{$dateToString:{format:"%Y-%m-%d", date:"$createdAt"}},
                    sales:{$sum:1},
                    revenue:{$sum:"$totalAmount"}
                }
            },
            {$sort:{_id:1}}
        ])


        const dateArray = getDatesInRange(startDate, endDate)


        return dateArray.map((date)=>{
            const foundDate  = dailySales.find((item)=>item._id ===date)

            return {
                date, 
                sales:foundDate?.sales||0,
                revenue:foundDate?.revenue||0
            }
        })
    } catch (error) {
        console.log(`error from get daily sales data, ${error}`)
    }
}


function getDatesInRange(startDate, endDate){
    const dates=[];
    let currentDate = new Date(startDate)

    while(currentDate<= endDate){
        dates.push(currentDate.toISOString().split("T")[0]);
        currentDate.setDate(currentDate.getDate()+1)
    }

    return dates
}





export const getDailySalesController =async(req, res)=>{
    try {
        const {startDate, endDate} = req.query;

        if(!startDate || !endDate){
            return res.status(401).json({
                message:"Please provide dates"
            })
        }


        const start = new Date(startDate)
        const end = new Date(endDate)
// end.setHours(23, 59, 59, 999)
        const data = await getDailySalesData(start, end)

        return res.status(201).json(data)
    } catch (error) {
        console.log(`error from getDaily sales controleer, ${error.b}`)
    }
}