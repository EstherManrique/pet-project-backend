const express = require('express');
const cors = require('cors');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const port = process.env.PORT || 4000;

connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Cors
const corsOptions = {
  origin: ["http://localhost:3000"],
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

app.use('/api/roles', require('./routes/roleRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/stores', require('./routes/storeRoutes'));
app.use('/api/services', require('./routes/serviceRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));


