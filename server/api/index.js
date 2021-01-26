const { Router } = require('express');
const testController = require('./tests');

const router = Router();

router
  .route('/tests')
  .get(testController.get)
  .post(testController.post);

module.exports = router;
