const { ProductModel } = require("../models/products.model")



const postProduct= async(req,res)=>{
    
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
        let query = {};
        let sortQuery = {};
        let searchQuery = {};
        if (req.query.category) {
            query.category = req.query.category;
        }
        if (req.query.sort) {
            sortQuery[req.query.sort] = req.query.sortOrder === 'asc' ? 1 : -1;
        }
        if (req.query.search) {
            searchQuery = { brand: { $regex: new RegExp(req.query.search, 'i') } };
        }
        const products= await ProductModel.find({ ...query, ...searchQuery }).sort(sortQuery)
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

