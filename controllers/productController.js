const { ProductModel } = require("../models/products.model")



const postProduct= async (req,res)=>{
    
    const {brand,price,category}=req.body
    try{
        const product= new ProductModel({brand,price,category})
        await product.save()
        res.status(200).json({msg:"producte added successfully",details:req.body})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

const getProduct = async(req,res)=>{
    try{
        const products= await ProductModel.find()
        res.status(200).json({msg:"products successfully fetched",data:products})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}

const updateProduct = async(req,res)=>{
    const {id}=req.params
    console.log(id)
    try{
        await ProductModel.findByIdAndUpdate({_id:id},req.body)
        res.status(200).json({msg:"product updated successfully",updatedDetails:req.body})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}
const deleteProduct = async(req,res)=>{
    const {id}=req.params
    try{
        await ProductModel.findByIdAndDelete({_id:id},req.body)
        res.status(200).json({msg:"product deleted successfully",deletedDetails:req.body})
    }
    catch(err){
        res.status(400).json({err:err.message})
    }
}
module.exports={postProduct,getProduct,updateProduct,deleteProduct}