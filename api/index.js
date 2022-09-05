import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose';

import authRouter from './routes/auth.js'
import hotelsRouter from './routes/hotels.js'
import roomsRouter from './routes/rooms.js'
import usersRouter from './routes/users.js'

import cookieParser from 'cookie-parser'
import cors from 'cors'

dotenv.config();


const app = express();

const PORT = process.env.PORT || 5000


app.get('/', (req, res) => {
    res.send('Hello HOme')
})

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/hotels', hotelsRouter)
app.use('/api/rooms', roomsRouter)
app.use('/api/users', usersRouter)


app.use((err, req, res, next) => {
    const errorStatus = err.status || 500;
    const errorMessage = err.message || 'Something went wrong';
    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMessage,
        stack: err.stack
    })
})

const connect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE)
        console.log('DB connected')
        app.listen(PORT, () => {
            console.log(`Server is running at port: http://localhost:${PORT}`)
        })
    } catch(error) {
        throw error
    }
}



// mongoose.connection.on("disconnected", () => {
//     console.log('mongoDB disconnected')
// })
// mongoose.connection.on("connected", () => {
//     console.log('mongoDB connected')
// })

connect()