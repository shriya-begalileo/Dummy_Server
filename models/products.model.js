const mongoose = require("mongoose")

const productSchema=mongoose.Schema({
    brand:{type:String,required:true},
    price:{type:String,require:true},
    category:{type:String,require:true}
},

{
    versionKey:false,
})

const ProductModel=mongoose.model("product",productSchema)
module.exports={ProductModel}