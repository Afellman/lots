const router = require('express').Router();
const lotController = require('../controllers/lotController');

router.route('/one/:ingredient').get(lotController.findOne)
router.route('/all').get(lotController.findAll)
router.route('/new').post(lotController.saveOne)
//   .delete(lotController.delete)
  
  
  module.exports = router;



  