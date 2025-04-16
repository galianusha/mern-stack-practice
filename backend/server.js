require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');

const app = express();
//middle are

const workRoutes = require('./routes/workout');
const userRoutes = require('./routes/user')

app.use((req, res, next) => {
 console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  next();
});
//routes

// app.get('/', (req, res) => {
//   res.send('Hello World! This is the backend server.');
// });
app.use(express.json());

app.use('/api/workouts',workRoutes);
app.use('/api/user',userRoutes);
//connect to db
const uri = "mongodb+srv://anusha:7777@cluster0.6gulssr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

mongoose.connect(uri)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('Connected to DB & Server is running on http://localhost:4000');
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
// app.listen(process.env.PORT, () => {
//   console.log('Server is running on http://localhost:4000');
// });