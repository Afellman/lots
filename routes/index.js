const path = require("path");
const router = require("express").Router();
const batchRoutes = require('./batchRoutes');
const lotRoutes =  require('./lotRoutes');

router.use("/batch", batchRoutes);
router.use('/lots', lotRoutes)

router.use(function(req, res) {
  res.sendFile(path.join(__dirname,"../client/build/index.html" ));
});

module.exports = router;