import express from 'express'
import {User} from '../../server.js'

const usersRouter = express.Router()

usersRouter.get("/", async(request, response, next)=> {
    try {
        const users = await User.findAll()
        response.send(users)
    } catch (error) {
        next(error)
    }
})
usersRouter.post("/", async(request, response, next)=> {
    try {
        const users = await User.create(request.body)
        response.status(201).send(users)
    } catch (error) {
        next(error)
    }


})
usersRouter.get("/:id", async(request, response, next)=> {
    try {
        const getUserById = await User.findByPk(request.params.id)
        if(getUserById){
            response.send(getUserById)
        }else{
            response.status(404).send(`The User with an id of ${request.params.id} is not found`)
        }
    } catch (error) {
        next(error)
    }
})
usersRouter.put("/:id", async(request, response, next)=> {
    try {
        const updateUserInfo = await User.update(request.body, {
            where:{
                id: request.params.id
            },
            returning: true,
        })
        response.send(updateUserInfo[1][0])
    } catch (error) {
        next(error)
    }
})
usersRouter.delete("/:id", async(request, response, next)=> {
    try {
        const deleteUser = await User.destroy({
            where:{
                id:request.params.id
            }
        })
        if(deleteUser>0){
            response.send(`The selected User with a specific Id of ${request.params.id} is deleted`)
        }
    } catch (error) {
        next(error)
    }
})







export default usersRouter