import express from 'express'
import dotenv from 'dotenv'
import router from './routes/routes.js'
import cors from 'cors'


dotenv.config()
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors({
    origin:'http://localhost:5173',
    methods:['GET,POST'],
    allowedHeaders: ['Content-Type', 'Authorization'] 

}))
app.use('/api',router)
export default app


