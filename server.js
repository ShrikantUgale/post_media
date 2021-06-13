import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';

import users from './routes/user';
import postMedia from './routes/postMedia'



dotenv.config();

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

const PORT = process.env.PORT;

const mongoURI = `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.rawrp.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`;

mongoose
    .connect(mongoURI,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => {
        console.log("Database connected");
    }).catch((error) => console.log(error.message));



app.use('/api', users);
app.use('/api', postMedia);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
