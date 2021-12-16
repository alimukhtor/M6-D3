import express from 'express'
// import Review from '../../../db/models/review.js'
import {Review, Product, User} from '../../server.js'

const reviewsRouter = express.Router()

reviewsRouter.get("/", async(request, response, next)=> {
    try {
        const reviews = await Review.findAll({
           include:[Product, User]
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
        console.log("Error is:", error);
        next(error)
    }
})
reviewsRouter.get("/:id", async(request, response, next)=> {
    try {
        const getReviewById = await Review.findByPk(request.params.id);
        if(getReviewById){
            response.send(getReviewById)
        }else{
            response.status(404).send(`The review with an id of ${request.params.id} is not found`)
        }
    } catch (error) {
        next(error)
    }
})
reviewsRouter.put("/:id", async(request, response, next)=> {
    try {
        const updateReview = await Review.update(request.body, {
            where:{id: request.params.id},
            returning: true,
        })
        response.send(updateReview[1][0])
    } catch (error) {
        next(error)
    }
})
reviewsRouter.delete("/:id", async(request, response, next)=> {
    try {
        const deleteReview = await Review.destroy({
            where:{
                id: request.params.id
            },

        })
        if(deleteReview>0){
            response.send(`The chosen review with a specific Id of ${request.params.id} is deleted`)
        }
    } catch (error) {
        next(error)
    }
})

export default reviewsRouter