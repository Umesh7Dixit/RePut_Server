import express from 'express';
import dotenv from 'dotenv';
import connectDB from './db/db.js';
import cookieparser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

const app = express();
dotenv.config();

const port = process.env.PORT || 5000;


// middlewares
app.use(express.json({limit: '50mb'}));
app.use(cookieparser());
// _____________




app.use("/api/user",userRoutes);

app.get('/', (req, res) => {
  res.send('Shree Radha');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    connectDB();
});