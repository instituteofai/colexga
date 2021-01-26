const { Router } = require('express');
const testController = require('./tests');

const router = Router();

router
  .route('/tests')
  .get(testController.get)
  .post(testController.post);

router
  .route('/tests/:testId')
  .put(testController.put)
  .delete(testController.delete);

module.exports = router;
