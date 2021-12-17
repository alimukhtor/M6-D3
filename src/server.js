import express from 'express'
import sequelize, { testDB } from './db/sequalization.js'

//*****************START OF ROUTERS ***************************/
import productsRouter from './services/products/product.js'
import reviewsRouter from './services/reviews/review.js'
import usersRouter from './services/users/user.js'
import categoryRouter from './services/category/category.js'
import cartRouter from './services/cart/cart.js'

//*****************END OF ROUTERS ***************************/

import Product from './db/models/product.js'
import Review from './db/models/review.js';
import Category from './db/models/category.js'
import productCategory from './db/models/productCategory.js'
import User from './db/models/users.js'
import Cart from './db/models/cart.js'



const server = express()



// ********************** TABLES CONNECTIONS ****************
Product.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(Product, { onDelete: "CASCADE" });

Category.belongsToMany(Product, {through: productCategory, onDelete: "CASCADE"});
Product.belongsToMany(Category, {through: productCategory, onDelete: "CASCADE"});

User.hasMany(Review, { onDelete: "CASCADE" });
Review.belongsTo(User, { onDelete: "CASCADE" });




Product.hasMany(Cart, { onDelete: "CASCADE" });
Cart.belongsTo(Product, { onDelete: "CASCADE" });

export {Product, Review, Category, productCategory, User, Cart};

// *********************** END OF CONNECTIONS **********************

const port = process.env.PORT

server.use(express.json())
server.use("/products", productsRouter)
server.use("/reviews", reviewsRouter)
server.use("/users", usersRouter)
server.use("/category", categoryRouter)
server.use("/cart", cartRouter)


server.listen(port, async()=> {
    console.log(`Server is running on port ${port}`);
    await testDB()
    await sequelize.sync();
} )