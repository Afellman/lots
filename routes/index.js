const path = require("path");
const router = require("express").Router();
const batchRoutes = require('./batchRoutes');
const lotRoutes =  require('./lotRoutes');
const fs = require('fs')

router.use("/batch", batchRoutes);
router.use('/lots', lotRoutes)

module.exports = router;
