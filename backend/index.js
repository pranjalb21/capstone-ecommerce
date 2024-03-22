//Requirements
const express = require('express');
const server = express();
const mongoose = require('mongoose');

//Routers
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands')


//Middlewares 
server.use(express.json()); //To parse request body

//Router attachments
server.use('/products', productsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands', brandsRouter.router)


//DB connecction
main()
async function main() {
    try {
        await mongoose.connect('mongodb://0.0.0.0:27017/ecommerce');
        console.log('DB connected successfully');
    } catch (error) {
        console.log(error)
    }
}

//Server start
server.listen(8080, () => {
    console.log('Server started');
})