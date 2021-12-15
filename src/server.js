import express from 'express'
import sequelize, { testDB } from './db/sequalization.js'
import productsRouter from './services/products/product.js'
const server = express()
const port = process.env.PORT

server.use(express.json())
server.use("/products", productsRouter)
// server.use("/reviews", reviewsRouter)


server.listen(port, async()=> {
    console.log(`Server is running on port ${port}`);
    await testDB()
    await sequelize.sync();
} )