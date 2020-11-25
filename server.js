require('dotenv').config();
const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require('mongoose');
const routes = require('./routes');

// Define middleware here
app.use(express.urlencoded({ extended: true }));
// this line below this one is in place of body parser, old library needed to parse json
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
}

// Connect to the Mongo DB
mongoose
  .connect(process.env.MONGO_CONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log('connected to MongoDB successfully, full send baby!!'))
  .catch((err) => {
    console.log(err);
  });

// Define API routes here
app.use(routes);
// Send every other request to the React app
// Define any API routes before this runs
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
