import express from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import path from 'path';
import cors from 'cors';


dotenv.config();

const app = express();
const __dirname = path.resolve();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(3001, () => {
  console.log('Server is running on port 3001!');
});

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

app.use(express.static(path.join(__dirname, '/client/dist')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
})

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});