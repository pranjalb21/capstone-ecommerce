const { Brand } = require("../model/Brand")

exports.createBrand = async (req,res) =>{
    const brand = new Brand(req.body);
    try{
        const response = await brand.save();
        res.status(201).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}

exports.fetchAllBrands = async(req,res)=>{
    const brand = Brand.find({});
    try{
        const response = await brand.exec();
        res.status(200).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}