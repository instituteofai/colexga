// const { expect } = require('chai');
// const request = require('supertest');
// const app = require('../app');
// const Submission = require('../models/submission.model');

// describe('Submission API', () => {

//   // Create a test
//   let testId;
//   before(async () => {
//     const res = await request(app)
//       .post(`/api/tests`)
//       .send({ name: 'Test Tasks' });
//     testId = res.body._id;
//   });

//   // Create a task of this new test
//   let taskId;
//   before(async () => {
//     const res = await request(app)
//       .post(`/api/tests/${testId}/tasks`)
//       .send({
//         question: 'Sample question',
//         questionType: 'ESSAY',
//         allowedTimeInSeconds: 1200,
//         test: testId
//       })
//     taskId = res.body._id;
//   })

//   it('should add a new submission to the database', async () => {
//     const res = await request(app)
//       .post(`/api/`)
//   })

// })