const express = require('express');
const router = express.Router();
const User = require('../models/user');
const Sondage = require('../models/sondage');



router.get('/dashboard', async (req, res) => {
  try {
    const users = await User.find();
    const sondages = await Sondage.find().populate('user');
    res.render('admin/dashboard', { users, sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading dashboard.', error });
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('admin/users', { users });
  } catch (error) {
    res.status(500).json({ message: 'Error loading users.', error });
  }
});
router.get('/sondages', async (req, res) => {
  try {
    const sondages = await Sondage.find().populate('user');
    res.render('admin/sondages', { sondages });
  } catch (error) {
    res.status(500).json({ message: 'Error loading sondages.', error });
  }
});

router.post('/sondages/delete/:id', (req, res) => {
  const { id } = req.params;
  const index = req.app.locals.sondages.findIndex(s => s.id == id);
  if (index !== -1) {
    req.app.locals.sondages.splice(index, 1);
    res.redirect('/admin/sondages');
  } else {
    res.status(404).send("Sondage not found.");
  }
});

module.exports = router;
