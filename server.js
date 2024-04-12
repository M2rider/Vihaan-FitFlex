
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js'
import centerauthRoutes from './routes/centerauthRoutes.js'
import centerRoutes from './routes/centerRoutes.js'

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : true }));
app.use(morgan('dev'));


// ROUTES
app.use('/api/v1/auth', authRoutes);
app.use('/api/v2/auth', centerauthRoutes);

app.use('/api/v2/center',centerRoutes);

app.get('/', (req, res) => {
    res.send({
        message: "welcome welcome"
    })
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () =>{
    console.log(`Server running on port ${PORT}`)
}) 