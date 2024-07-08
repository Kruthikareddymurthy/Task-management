const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const taskRoutes = require('./routes/tasks');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost/taskmanager', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Middleware to parse JSON
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static('public'));

// Make the index.html accessible via the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Task Routes
app.use('/tasks', taskRoutes);

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
