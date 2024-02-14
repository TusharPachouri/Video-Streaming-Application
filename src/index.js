import dotenv from 'dotenv';
import {app} from './app.js'
import connectDB from './db/db.js'
dotenv.config({
    path: './.env'
})


const PORT = process.env.PORT;

connectDB()
.then(() => {
    app.listen(PORT, () => {
        console.log(`Server listening on ${PORT}`)
    })
})
.catch((err) => {
    console.error(`MongoDB Server Connection error!!! :`,err)
})