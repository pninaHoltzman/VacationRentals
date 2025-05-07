import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import cityRouter from './api/routers/city.js'
import adverteiserRouter from './api/routers/adverteiser.js'
import categoryRouter from './api/routers/category.js'
import apartmentRouter from './api/routers/apartment.js'
import dotenv from 'dotenv';

dotenv.config();
const app =express()
const port = 3001
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(process.env.LOCAL_URI)
    .then(()=>{
        console.log('Connected to MongoDB 😍')
    })
    .catch(err=>{
        console.log({error:err.message})
    })
// app.use('/adverteiser',checkAuthorization,adverteiserRouter)
// app.use('/city',checkAuthorization,cityRouter)
// app.use('/category',checkAuthorization,categoryRouter)
// app.use('/apartment',apartmentRouter)
app.use('/adverteiser',adverteiserRouter)
app.use('/city',cityRouter)
app.use('/category',categoryRouter)
app.use('/apartment',apartmentRouter)

app.listen(port, () => {
  console.log(`my app listening at http://localhost:${port}`)
})
