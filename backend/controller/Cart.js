const { Cart } = require("../model/Cart")

exports.fetchItemsByUserId = async(req, res) => {
    const {user} = req.query;
    try{
        const cartItems = await Cart.find({user:user}).populate('user').populate('item');
        res.status(201).json(cartItems);
    }catch(error){
        res.status(400).json({error});
    }
}

exports.addToCart=async(req,res)=>{
    const cart = new Cart(req.body);
    try{
        const doc = await cart.save();
        res.status(201).json(doc);
    }catch(error){
        res.status(400).json(error);
    }
}

exports.updateCart=async(req,res)=>{
    try{
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(201).json(cart);
    }catch(error){
        res.status(400).json(error);
    }
}