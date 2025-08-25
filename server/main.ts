import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import morgan from 'morgan';
import userRouter from './routes/userRoutes';
import postRouter from './routes/blogPostRoutes';
import authRouter from './routes/authRoutes';
import dotenv from 'dotenv';

dotenv.config();

await mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB:', error);
  });

const app = express();

// HTTP request logging
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Blog Post app Server' });
});

app.use('/api/auth', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);

app.listen(process.env.PORT || 8000, () => {
  console.log(
    `Server is running on: http://localhost:${process.env.PORT || 8000}`,
  );
});
