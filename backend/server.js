const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();


const app = express();



app.use(cors());
app.use(express.json());




const uri = process.env.ATLAS_URI;
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => console.log('Mongodb database connection extablished successfully'));

const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users')



app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);






PORT = 4444;
app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})


