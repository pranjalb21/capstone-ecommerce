const { Category } = require("../model/Category")

exports.createCategory = async (req, res) => {
    const category = new Category(req.body);
    try{
        const response = await category.save();
        res.status(201).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}

exports.fetchCategory = async(req,res)=>{
    const category = Category.find({});
    try{
        const response = await category.exec();
        res.status(200).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}