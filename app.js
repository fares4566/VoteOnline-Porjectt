const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // Middleware to parse JSON request bodies

// In-memory data
const users = [];
const sondages = [];
const userVotes=[];
// Import routes
const userRoutes = require('./routes/authRoutes');
const sondageRoutes = require('./routes/surveyRoutes');
const optionRoutes = require('./routes/optionRoutes');
const voteRoutes = require('./routes/voteRoutes');



// Pass in-memory data to routes
app.locals.users = users;  // Share users array
app.locals.sondages = sondages;  // Share sondages array
app.locals.userVotes = userVotes; 

// Use routes
app.use('/users', userRoutes);  // Correctly using the router
app.use('/sondages', sondageRoutes);
app.use('/options', optionRoutes);
app.use('/votes', voteRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
