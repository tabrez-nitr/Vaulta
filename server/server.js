import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/db'
import authRouter from './routes/auth'



const app = express();

//connect to database
connectDB()

const PORT = process.env.PORT || 8000;;

//essential middlewares
//cors - to allow cross origin requests
app.use(cors({
    credentials:true,
    origin:"http://localhost:3000"
}))
//express.json() - to parse json requests express.json() is middleware that reads JSON data sent by the client and converts it into a JavaScript object.
//express.urlencoded() - to parse url encoded requests
app.use(express.json())

//routes
app.use('/api/auth',authRouter)


app.get('/',(req,res)=>{
    res.json({message:"SERVER IS LIVE"})
})

app.listen(PORT,()=>{
    console.log(`server is live ${PORT}`)
})
