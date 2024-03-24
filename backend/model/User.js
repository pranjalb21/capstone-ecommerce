const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: { type: String, required: [true, 'Name can not be empty.'] },
    email: { type: String, required: [true, `Email can't be empty`], unique: [true, `Email ID already exists`] },
    password: { type: String, required: [true, `Password can't be empty`] },
    role: { type: String, default: 'user' },
    addresses: { type: [Schema.Types.Mixed], default: [] },
    orders: { type: [Schema.Types.Mixed], default: [] }
})

const virtual = userSchema.virtual('id');
virtual.get(function () {
    return this._id;
})
userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) { delete ret._id }
})

exports.User = mongoose.model('User', userSchema);