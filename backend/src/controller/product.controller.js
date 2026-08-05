import cloudinary from "../config/cloudinary.js";
import { redis } from "../config/redis.js";
import { Product } from "../models/product.model.js";
import Groq from "groq-sdk";
import { ENV } from "../config/env.js";

const groq = new Groq({ apiKey: ENV.GROQ_API_KEY });
export const createProduct = async(req ,res)=>{
    try {
        const {name, description, price, category} = req.body;

        if(!name || !description || !price || !category){
            return res.status(401).json({
                message:"Please provide all the details"
            })
        }
        let imageUrl =''
        if(req.file){
             const base64 = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`

             const uploadRes = await cloudinary.uploader.upload(base64,{
                folder:"Product"
             })

             imageUrl  =uploadRes.secure_url
        }

        const product = await Product.create({
            name,
            category,
            price,
            description,
            image:imageUrl
        })

        const keys = await redis.keys("products:*")

        if(keys.length>0){
            await redis.del(...keys) 
        }

        return res.status(201).json(product)

    } catch (error) {
        console.log(error,"From create product controller")
    }
}



export const getProductController = async(req,res)=>{
    try {
        const page = parseInt(req.query.page ??"1", 10)
        const limit = parseInt(req.query.limit?? "20",10)
        const skip = (page-1 )*limit


        const {search, category, minPrice, maxPrice} = req.query


   const categories = await Product.distinct("category");


const prompt = `You are an intelligent assistant for an E-commerce platform. A user will type any query about what they want, possibly with typos, informal spelling, or mixed Hindi/English (Hinglish). Your task is to understand the intent and return the most relevant keyword from the following list of categories:
${categories.map(c => `- ${c}`).join("\n")}

Focus on meaning and intent, not exact spelling or language. If none of these categories genuinely match the query's intent, reply with exactly: NONE

Only reply with one single keyword from the list above, or NONE. Do not explain anything. No extra text. Query: "${search}"`;


       let aiText = null;

if (search && search.trim() !== "") {
    const completion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
    });

    const rawAiText = completion?.choices?.[0]?.message?.content
        ?.trim()
        .replace(/[`"\n]/g, "") || "";

    aiText = rawAiText.toUpperCase() === "NONE" ? search.trim() : rawAiText;

    // console.log("AI raw output for query:", search, "->", rawAiText, "| final aiText:", aiText);
}

        let aiCategory = category

        const mongoQuery = {}

       if(aiText){
    mongoQuery.$or=[
        {name:{$regex:aiText, $options:"i"}},
        {description:{$regex:aiText, $options:"i"}},
        {category:{$regex:aiText, $options:"i"}}
    ]
}

        if(category){
            mongoQuery.category = category
        }
        if(minPrice || maxPrice){
            mongoQuery.price={}

            if(minPrice) mongoQuery.price.$gte = Number(minPrice)
            if(maxPrice) mongoQuery.price.$lte = Number(maxPrice)
        }


        const cacheKey = `products:${JSON.stringify({
            page,
            limit,
            search:aiText??"",
            category:aiCategory??"",
            minPrice:minPrice??"",
            maxPrice:maxPrice??""
        })}`


        const  cached = await redis.get(cacheKey)

        if(cached){
            const data = typeof cached==='string'?JSON.parse(cached):cached

            return res.status(200).json({fromCached:true, ...data})

        }


        const [item, total]=await Promise.all([
            Product.find(mongoQuery).skip(skip).limit(limit).lean(),
            Product.countDocuments(mongoQuery)
        ])


        if(!item || item.length===0){
            const emptyPayload={
                products:[],
                page,
                limit,
                total:0,
                hasMore:false,
                appliedFilters:{
                    search:aiText,
                    category:aiCategory,
                    minPrice,
                    maxPrice
                }
            }

            await redis.set(cacheKey, JSON.stringify(emptyPayload))
            return res.status(200).json({fromCached:false, ...emptyPayload})
        }


        const totalPages = Math.ceil(total/limit)
        const hasMore = page < totalPages

        const payload={
            products:item,
            page,
            limit,
            total,
            totalPages,
            hasMore,
            appliedFilters:{
                search:aiText,
                category:aiCategory,
                minPrice,
                maxPrice
            }
        }


        await redis.set(cacheKey, JSON.stringify(payload), {ex:600})


        return res.status(201).json({fromCached:false, ...payload})



    } catch (error) {
        console.log(`error from getPRoduct controller, ${error}`)
    }
}




export const getFeatureProduct=async(req,res)=>{
    try {
        const featuredProducts = await Product.find({isFeatured:true})

        if(!featuredProducts){
            return res.status(401).json({
                message:"No products found"
            })
        }



        return res.status(201).json(featuredProducts)
    } catch (error) {
        console.log(`error from get feature product`)
    }
}

export const toggleFeatureProducts = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }

    product.isFeatured = !product.isFeatured
    await product.save()

    const keys = await redis.keys("products:*")
    if (keys.length > 0) {
      await redis.del(...keys)
    }

    return res.status(200).json({
      message: "Product toggled successfully",
      product
    })
  } catch (error) {
    console.log("toggle error:", error)
    res.status(500).json({ message: "Server error" })
  }
}



export const deleteProduct = async(req,res)=>{
    try {
        const productId = req.params.id;

        const product = await Product.findById(productId)

        if(!product){
            return res.status(401).json({
                message:"Product not found"
            })
        }

        if(product.image){
            const publicId  = product.image.split("/").pop().split(".")[0]
            try {
                await cloudinary.uploader.destroy(`Product/${publicId}`)
          
            } catch (error) {
                console.log(`error from deleting image, ${error
                    }`)
            }
        }



        await Product.findByIdAndDelete(req.params.id)

        const keys = await redis.keys('products:*')

        if(keys.length>0){
            await redis.del(...keys)
        }


        return res.status(201).json({
            message:"Product deleted succesfully"
        })
    } catch (error) {
        console.log(`error from delete PRoduct`)
    }
}


export const getSingleProduct = async(req,res)=>{
    try {
        const productId = req.params.id
        const product = await  Product.findById(productId)

        if(!product){
            return res.status(401).json({
                message:"Product not found"
            })
        }

        return res.status(201).json(product)
    } catch (error) {
        console.log(`error from get single Product, ${error}`)
    }
}