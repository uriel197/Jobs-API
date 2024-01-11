require('dotenv').config();
require('express-async-errors');

const express = require('express');
const app = express();

// connect to DB
const connectDB = require('./db/connect');

// Routes 
const authRouter = require('./routes/auth');
const jobsRouter = require('./routes/jobs');

// error handlers
const errorHandlerMiddleware = require('./middleware/error-handler');
const notFoundMiddleware = require('./middleware/not-found');

// middleware
app.use(express.json());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', jobsRouter);
app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 4000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
}

start();