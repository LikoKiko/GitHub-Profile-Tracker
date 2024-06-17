const express = require('express');
const mongoose = require('mongoose');
const githubRoutes = require('./routes/users.js');

const app = express();

mongoose.connect('mongodb://localhost:27017/', {
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', githubRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
