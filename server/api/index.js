const { Router } = require('express');
const passport = require('passport');
const testController = require('./tests');
const taskController = require('./tasks');
const submissionController = require('./submission');

const router = Router();

// Tests
router
  .route('/tests')
  .get(testController.get)
  .post(testController.post);

router
  .route('/tests/:testId')
  .put(testController.put)
  .delete(testController.delete);

// Tasks
router
  .route('/tests/:testId/tasks')
  .get(taskController.get)
  .post(taskController.post);

router
  .route('/tests/:testId/tasks/:taskId')
  .put(taskController.put)
  .delete(taskController.delete);

// Submissions
router.route('/submissions/:userId').get(submissionController.get);
router.route('/submissions').post(submissionController.post);
router.route('/submissions/:submissionId').put(submissionController.put);
router.route('/submissions/:submissionId').delete(submissionController.delete);

// Auth
router
  .route('/auth/google')
  .get(passport.authenticate('google', { scope: ['profile', 'email'] }));

router.route('/auth/login/success').get((req, res) => {
  if (req.user) {
    res.status(201).json({
      success: true,
      message: 'Successfully authenticated!',
      user: req.user,
      // cookies: req.cookies,
    });
  } else {
    res.status(201).json({
      success: true,
      message: 'Not authenticated!',
    });
  }
});

router.route('/auth/login/failed').get((req, res) => {
  res.status(401).json({
    success: false,
    message: 'Failed to authenticate!',
  });
});

router.route('/auth/logout').get((req, res) => {
  req.session = null;
  req.logout();
  res.redirect('/');
});

router.route('/auth/google/redirect').get(
  passport.authenticate('google', {
    failureRedirect: '/auth/login/failed',
  }),
  (req, res) => {
    res.redirect('/');
  },
);

module.exports = router;
