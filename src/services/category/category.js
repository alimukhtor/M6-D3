import express from 'express';

import {Category} from '../../server.js'

const categoryRouter = express.Router()


categoryRouter.get("/", async(request, response, next)=> {
    try {
        const category = await Category.findAll()
        response.send(category)
    } catch (error) {
        next(error)
    }
})
categoryRouter.post("/", async(request, response, next)=> {
    try {
        const category = await Category.create(request.body)
        response.status(201).send(category)
    } catch (error) {
        next(error)
    }

})
categoryRouter.get("/:id", async(request, response, next)=> {
    try {
        const getById = await Category.findByPk(request.params.id, {
            where:{
                id: request.params.id
            }
        })
        
        if(getById){
            response.send(getById)
        }else{
            response.status(404).send(`The category with an id of ${request.params.id} is not found`)
        }
    } catch (error) {
        next(error)
    }
})
categoryRouter.put("/:id", async(request, response, next)=> {

    try {
        const updateCategory = await Category.update(request.body, {
          where:{
              id: request.params.id
          },
          returning:true,  
        })
        response.send(updateCategory[1][0])
    } catch (error) {
        next(error)
    }
})
categoryRouter.delete("/:id", async(request, response, next)=> {
    try {
        const deleteCategory = await Category.destroy({
            where:{
                id:request.params.id
            }
        })
        if(deleteCategory>0){
            response.send(`The chosen category with a specific Id of ${request.params.id} is deleted`)
        }
    } catch (error) {
        next(error)
    }
})

export default categoryRouter