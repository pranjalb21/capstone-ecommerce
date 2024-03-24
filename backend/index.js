//Requirements
const express = require('express');
const server = express();
const mongoose = require('mongoose');
const cors = require('cors');

//Middlewares 
server.use(express.json()); //To parse request body
server.use(cors({
    exposedHeaders: ['X-Total-Count']
}));

//Routers
const productsRouter = require('./routes/Products');
const categoriesRouter = require('./routes/Categories');
const brandsRouter = require('./routes/Brands')
const userRouter = require('./routes/Users')
const authRouter = require('./routes/Auths')
const cartRouter = require('./routes/Carts')


//Router attachments
server.use('/products', productsRouter.router)
server.use('/categories',categoriesRouter.router)
server.use('/brands', brandsRouter.router)
server.use('/user',userRouter.router);
server.use('/auth',authRouter.router);
server.use('/cart',cartRouter.router);


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
server.listen(8000, () => {
    console.log('Server started...');
})