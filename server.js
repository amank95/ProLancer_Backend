import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoute from './routes/userRoute.js';
import gigRoute from './routes/gigRoute.js';
import orderRoute from './routes/orderRoute.js';
import reviewRoute from './routes/reviewRoute.js';
import messageRoute from './routes/messageRoute.js';
import conversationRoute from './routes/conversationRoute.js';
import authRoute from './routes/authRoute.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
const app = express();
dotenv.config();

const connect=async()=>{
try{
await mongoose.connect(process.env.MONGO_URL)
console.log('Database connected successfully');
}catch(err){
   console.log('Database connection error:', err);
}
}

app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))
app.use(express.json());
app.use(cookieParser())

app.get('/', (req, res) => {
  res.send('Backend is running 🚀');
});
app.use('/api/auth', authRoute);
app.use('/api/users', userRoute);
app.use('/api/gigs', gigRoute);
app.use('/api/orders', orderRoute); 
app.use('/api/reviews', reviewRoute);
app.use('/api/messages', messageRoute);
app.use('/api/conversations', conversationRoute);



app.listen(process.env.PORT, () => {
  connect()
  console.log(`https://pro-lancer-backend.vercel.app/`);
});
