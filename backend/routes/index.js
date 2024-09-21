const express = require("express");
const router = express.Router();
const usersRoutes = require("../routes/usersRoute");
const todosRoutes = require("../routes/todosRoute");

router.use("/api", usersRoutes);
router.use("/api", todosRoutes);

module.exports = router;
