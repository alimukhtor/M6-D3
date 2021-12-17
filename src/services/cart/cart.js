import express, { response } from 'express'
import { Op, fn, col} from "sequelize";
import {Cart, Product, User} from '../../server.js'

const cartRouter = express.Router()

cartRouter.get("/", async(request, response, next)=> {
    try {
        const getById = await Cart.findAll({
            include: 
                { model: Product, attributes:['name', 'description', 'image', 'price']},
                attributes: ['productId', [fn('COUNT', col('product.id')), 'total']],
                 group:['productId', 'product.id']
        })
        response.send(getById)
    } catch (error) {
        next(error)
    }
})

cartRouter.post("/", async(request, response, next)=> {
    try {
        const addProduct = await Cart.create(request.body)
        response.send(addProduct)
    } catch (error) {
        console.log("Error is:", error);
        next(error)
    }
})




export default cartRouter