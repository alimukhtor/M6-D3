import express from 'express'
import sequelize, { testDB } from './db/sequalization.js'
import productsRouter from './services/products/product.js'
import reviewsRouter from './services/products/reviews/review.js'
const server = express()
// import Product from './product.js'
import Product from './db/models/product.js'
import Review from './db/models/review.js';


Product.hasMany(Review);
Review.belongsTo(Product);

export {Product, Review};


const port = process.env.PORT

server.use(express.json())
server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)


server.listen(port, async()=> {
    console.log(`Server is running on port ${port}`);
    await testDB()
    await sequelize.sync();
} )