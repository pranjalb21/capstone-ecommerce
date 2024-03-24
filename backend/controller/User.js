const { User } = require("../model/User")

exports.fetchUserById = async(req,res)=>{
    try{
        const response = await User.findById(req.params.id, 'name email id').exec();
        res.status(200).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}

exports.updateUser = async(req,res)=>{
    try{
        const response = await User.findByIdAndUpdate(req.params.id, req.body,{new:true});
        res.status(201).json(response);
    }catch(error){
        res.status(400).json(error);
    }
}