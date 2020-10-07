import express  from 'express';
import dotenv from "dotenv";
import colors from 'colors';

import connectDB from "./config/db.js";
import productsRoutes from './routes/productRoutes.js';

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('API is running');
});

app.use('/api/products', productsRoutes);

app.listen(PORT, () => {
    console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}` . blue.bold);
});