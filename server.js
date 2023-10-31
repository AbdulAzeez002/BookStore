const express=require('express')
const dotenv=require('dotenv').config()
const connectDB=require('./config/db')

const port=process.env.PORT || 5000


const app=express()

app.use(express.json())  // middleware to print json data
app.use(express.urlencoded({extended:false}))

app.use('/api/book',require('./routes/bookRoutes'))
app.use('/api/user',require('./routes/userRoutes'))


app.listen(port,()=>{
    console.log(`server running at port ${port}`)
})
