const express = require ('express')
const connection = require('./config/db')
const userRouter = require('./routes/userRoutes')

const app = express()
app.use(express.json())

const PORT = 8080 

app.get('/',(req,res)=>{
    res.send('Welcome to Dummy Server !!')
})

app.use('/users', userRouter)

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