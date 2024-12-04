const express = require('express');
const router = express.Router();

// Middleware for admin authentication (optional)
const isAdmin = (req, res, next) => {
  // Add your logic here to check admin rights
  next();
};

// Admin dashboard
router.get('/dashboard', isAdmin, (req, res) => {
  res.render('admin/dashboard', {
    users: req.app.locals.users,
    sondages: req.app.locals.sondages,
  });
});

// View all users
router.get('/users', isAdmin, (req, res) => {
  res.render('admin/users', { users: req.app.locals.users });
});

// View all sondages
router.get('/sondages', isAdmin, (req, res) => {
  res.render('admin/sondages', { sondages: req.app.locals.sondages });
});

// Delete a sondage
router.post('/sondages/delete/:id', isAdmin, (req, res) => {
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
