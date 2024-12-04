const dotenv = require('dotenv');
const express = require('express');
const auth=require('./Middlewares/authMiddleware')
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const app = express();
connectDB();
const PORT = 3000;








app.set('view engine', 'ejs');

// Define the folder where EJS templates are stored
app.set('views', './views');

app.use(express.json()); 
// In-memory data
const users = [];
const sondages = [];
const userVotes = [];


const userRoutes = require('./routes/authRoutes');
const sondageRoutes = require('./routes/surveyRoutes');
const optionRoutes = require('./routes/optionRoutes');
const voteRoutes = require('./routes/voteRoutes');
const adminRoutes = require('./routes/adminRoutes');
app.locals.users = users;  
app.locals.sondages = sondages;  
app.locals.userVotes = userVotes;
app.use(cookieParser());
// Use routes
app.use('/users', userRoutes);  
app.use('/admin', adminRoutes);
app.get('/', (req, res) => {
  res.render('index');
});

app.use(auth)
app.use('/sondages',sondageRoutes);
app.use('/options',optionRoutes);
app.use('/votes' ,voteRoutes);



// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
