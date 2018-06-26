const router = require('express').Router();
const batchController = require('../controllers/batchController');

router.route('/new')
  // .get(batchController.findAll)
  .post(batchController.saveOne)
router.route('/delete')
  .post(batchController.deleteOne)

router.route('/noDates')
  .get(batchController.getNoDates)
  
router.route('/getTen/:skip')
  .get(batchController.getTen)
  module.exports = router;