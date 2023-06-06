require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth.js');
const attendeeRoutes = require('./routes/attendee.js');

const morgan = require('morgan');

const app = express();

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", (error) => {
  console.error(error);
});
db.once("open", () => console.log("Connected to Database"));

//middleware
app.use(express.json());
app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));

//route middleware
app.use('/api', authRoutes);
app.use('/lead', attendeeRoutes);
app.listen(process.env.PORT, () => console.log(`Server is running on port ${process.env.PORT}`));