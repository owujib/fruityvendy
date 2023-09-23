const router = require('express').Router();
const fruitsController = require('../controllers/fruitsController');

router.route('/').get(fruitsController.getAll).post(fruitsController.addFruits);

router
  .route('/:value')
  .get(fruitsController.getSingle)
  .delete(fruitsController.removeFruits);

module.exports = router;
