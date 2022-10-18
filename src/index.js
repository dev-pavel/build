import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import AuthRoutes from "./routes/auth.js";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost:27017/users')
    .then(() => console.log('mongo connected'))
    .catch(() => console.log('mongo connection error'))

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/auth', AuthRoutes)

app.listen(5000, () => console.log('server started'))
