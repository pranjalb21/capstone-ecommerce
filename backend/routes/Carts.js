
const express = require('express');
const { addToCart, fetchItemsByUserId, updateCart } = require('../controller/Cart');
const router = express.Router();

router 
    .post('/',addToCart)
    .get('/',fetchItemsByUserId)
    .patch('/:id',updateCart)

exports.router = router;