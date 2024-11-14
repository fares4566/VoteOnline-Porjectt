const dotenv = require('dotenv');
const express = require('express');
const auth=require('./Middlewares/authMiddleware')
const app = express();
const PORT = 3000;



app.use(express.json()); 
// In-memory data
const users = [];
const sondages = [];
const userVotes = [];


const userRoutes = require('./routes/authRoutes');
const sondageRoutes = require('./routes/surveyRoutes');
const optionRoutes = require('./routes/optionRoutes');
const voteRoutes = require('./routes/voteRoutes');

app.locals.users = users;  
app.locals.sondages = sondages;  
app.locals.userVotes = userVotes;

// Use routes
app.use('/users', userRoutes);  

app.use(auth)
app.use('/sondages',sondageRoutes);
app.use('/options',optionRoutes);
app.use('/votes' ,voteRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
