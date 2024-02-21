

const express =require("express")
const { postProduct, getProduct, updateProduct, deleteProduct } = require("../controllers/productController")

const productRouter=express.Router()

productRouter.post('/',postProduct)
productRouter.get('/',getProduct)
productRouter.patch('/:id',updateProduct)
productRouter.delete('/:id',deleteProduct)


module.exports={productRouter}