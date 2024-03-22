const mongoose = require('mongoose');
const {Schema} = mongoose;

const brandSchema = new Schema({
    value: {type:String, unique:[true, 'This brand is already exists'],required:[true, `Brand can't be empty`]},
    label: {type:String, unique:[true, 'This brand is already exists'],required:[true, `Brand can't be empty`]},
})

const virtuals = brandSchema.virtual('id');
virtuals.get(function(){
    return this._id;
})
brandSchema.set('toJSON',{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){delete ret._id}
})

exports.Brand = mongoose.model('Brand',brandSchema)