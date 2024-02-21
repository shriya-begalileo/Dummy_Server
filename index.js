const express = require ('express')
const connection = require('./config/db')
const userRouter = require('./routes/userRoutes')
const { productRouter } = require('./routes/productsRoutes')
const cors=require('cors')
const app = express()
app.use(express.json())
app.use(cors())
app.get('/',(req,res)=>{
  res.send('Welcome to Dummy Server !!')
})
app.use('/users', userRouter)
app.use('/products',productRouter)


const PORT = 8080 
app.listen(PORT,async()=>{
      try {
        await connection()
        console.log('Connected to DB')
        console.log(`App is listening to ${PORT}`)
      }
      catch(error){
        console.log(error)
      } 
})