import express from 'express'
// import Review from '../../../db/models/review.js'
import {Review, Product} from '../../../server.js'

const reviewsRouter = express.Router()

reviewsRouter.get("/", async(request, response, next)=> {
    try {
        const reviews = await Review.findAll({
           include:Product
        })

        response.send(reviews)
    } catch (error) {
        next(error)
    }
})
reviewsRouter.post("/", async(request, response, next)=> {
    try {
        const newReview = await Review.create(request.body)
        response.status(201).send(newReview)        
    } catch (error) {
        next(error)
    }
})
reviewsRouter.get("/:id", async(request, response, next)=> {})
reviewsRouter.put("/:id", async(request, response, next)=> {})
reviewsRouter.delete("/:id", async(request, response, next)=> {})

export default reviewsRouter