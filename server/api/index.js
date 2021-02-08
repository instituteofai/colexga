const { Router } = require('express');
const testController = require('./tests');
const taskController = require('./tasks');
const submissionController = require('./submission');

const router = Router();

// Tests and Tasks
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

// User submissions
router.route('/submissions/:userId').get(submissionController.get);
router.route('/submissions').post(submissionController.post);
router.route('/submissions/:submissionId').put(submissionController.put);
router.route('/submissions/:submissionId').delete(submissionController.delete);

module.exports = router;
