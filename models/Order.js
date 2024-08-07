const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    userId:{type: String, required: true},
    products: [{
        productsId:{ type : String},
        quantity:{type:Number, default: 1}
    }],
address: {type: String , required: true},
amount: {type: Number, required: true},
status:{type: String, required: true , default:'pending'},

}, {timestamps: true});
mongoose.models = {}
export default mongoose.model("Order",OrderSchema)