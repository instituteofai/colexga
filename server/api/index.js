const { Router } = require('express');
const testController = require('./tests');
const taskController = require('./tasks');

const router = Router();

router
  .route('/tests')
  .get(testController.get)
  .post(testController.post);

router
  .route('/tests/:testId')
  .put(testController.put)
  .delete(testController.delete);

router
  .route('/tests/:testId/tasks')
  .get(taskController.get)
  .post(taskController.post);

router
  .route('/tests/:testId/tasks/:taskId')
  .put(taskController.put)
  .delete(taskController.delete);

module.exports = router;
