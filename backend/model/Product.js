const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, `Price should be more than 0`], required: true },
    discountPercentage: {
        type: Number, min: [0, 'Discount percentage should not be less than 0'], max: [99, 'Discount percentage should be less than 100'], required: true
    },
    rating: { type: Number, min: [0, 'Rating should not be less than 0'], max: [5, 'Rating must not be more than 5'], required: true },
    stock: { type: Number, min: [0, 'Stock number should not be less than 0'], required: true, default: 0 },
    active: { type: Boolean, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true },
})


const virtual = productSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})


exports.Product = mongoose.model('Product', productSchema)