const path = require("path");
const router = require("express").Router();
const customerRoutes = require("./customerRoutes");
const projectRoutes = require("./projectRoutes");

// customer routes
router.use("/customer", customerRoutes);

// project routes
router.use("/project", projectRoutes);

// If no API routes are hit, send the React app
router.use(function (req, res) {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

module.exports = router;
