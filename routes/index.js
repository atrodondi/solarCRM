const path = require('path');
const router = require('express').Router();
const customerRoutes = require('./customerRoutes');
const projectRoutes = require('./projectRoutes');
const customerNotesRoutes = require('./customerNotesRoutes');
const projNotesRoutes = require('./projectNotesRoutes');

// customer routes
router.use('/customer', customerRoutes);

// project routes
router.use('/project', projectRoutes);

// customer notes routes
router.use('/customerNotes', customerNotesRoutes);

// proj notes routes
router.use('/projectNotes', projNotesRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = router;
