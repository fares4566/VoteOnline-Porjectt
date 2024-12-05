const dotenv = require('dotenv');
const express = require('express');
const auth=require('./Middlewares/authMiddleware')
const cookieParser = require('cookie-parser');
const connectDB = require('./db');

const app = express();
connectDB();
const PORT = 3000;

const path = require('path');






app.set('views', path.join(__dirname, 'views')); 
app.set('view engine', 'ejs');



app.use(express.json()); 


const userRoutes = require('./routes/authRoutes');
const sondageRoutes = require('./routes/surveyRoutes');
const optionRoutes = require('./routes/optionRoutes');
const voteRoutes = require('./routes/voteRoutes');
const adminRoutes = require('./routes/adminRoutes');

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
