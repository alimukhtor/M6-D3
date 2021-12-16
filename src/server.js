import express from 'express'
import sequelize, { testDB } from './db/sequalization.js'
import productsRouter from './services/products/product.js'
import reviewsRouter from './services/products/reviews/review.js'
const server = express()
import Product from './db/models/product.js'
import Review from './db/models/review.js';
import Category from './db/models/category.js'
import productCategory from './db/models/productCategory.js'

// ********************** TABLES CONNECTIONS ****************
Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

Category.belongsToMany(Product, {through: productCategory, onDelete: "CASCADE"});
Product.belongsToMany(Category, {through: productCategory, onDelete: "CASCADE"});

export {Product, Review, Category, productCategory};

// *********************** END OF CONNECTIONS **********************

const port = process.env.PORT

server.use(express.json())
server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)


server.listen(port, async()=> {
    console.log(`Server is running on port ${port}`);
    await testDB()
    await sequelize.sync();
} )