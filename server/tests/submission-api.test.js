const { expect } = require('chai');
const { Test } = require('mocha');
const request = require('supertest');
const app = require('../app');
const Submission = require('../models/submission.model');

describe('Submission API', () => {

  // Create a test
  let testId;
  let test;
  before(async () => {
    const res = await request(app)
      .post(`/api/tests`)
      .send({ name: 'Test Tasks' });
    testId = res.body._id;
    test = res.body;
  });

  // Create a task of this new test
  let task;
  before(async () => {
    const res = await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question',
        allowedTimeInSeconds: 1200,
        test: testId
      })
    task = res.body;
  })

  it('should add a new submission to the database', async () => {
    const payload = {
      taskId: task._id,
      question: task.question,
      answer: 'Sample answer',
      timeLeftInSeconds: 20,
      score: 8.2,
      createdOn: new Date(),
      testId: task._id,
      testName: test.name,
      userId: task._id,
      email: 'chandan@instituteofai.com',
      lastModified: new Date(),
      isEvaluated: true,
    };
    const res = await request(app)
      .post(`/api/submissions`)
      .send(payload)
      .expect(201);
    
    expect(res.body).to.haveOwnProperty('answer', payload.answer);
    const savedSubmission = await Submission.findById(res.body._id);
    expect(savedSubmission.answer).to.equal(payload.answer);
  })

  it('should return newly created submissions of a user', async() => {

    let res = await request(app)
      .get(`/api/submissions/${task._id}`)
      .expect(200);
    
    expect(res.body.submissions).to.be.an('array');
    const previousLength = res.body.submissions.length;
    const expectedLength = previousLength + 1;

    const payload = {
      taskId: task._id,
      question: task.question,
      answer: 'Sample answer',
      timeLeftInSeconds: 20,
      score: 8.2,
      createdOn: new Date(),
      testId: task._id,
      testName: test.name,
      userId: task._id,
      email: 'chandan@instituteofai.com',
      lastModified: new Date(),
      isEvaluated: true,
    };

    await request(app)
      .post('/api/submissions')
      .send(payload)
      .expect(201);
    
    res = await request(app)
      .get(`/api/submissions/${task._id}`)
      .expect(200);
    
    expect(res.body.submissions.length).to.equal(expectedLength);

  });

  it('should update details of an existing submission', async () => {
    const payload = {
      taskId: task._id,
      question: task.question,
      answer: 'Sample answer',
      timeLeftInSeconds: 20,
      score: 8.2,
      createdOn: new Date(),
      testId: task._id,
      testName: test.name,
      userId: task._id,
      email: 'chandan@instituteofai.com',
      lastModified: new Date(),
      isEvaluated: true,
    };

    const res = await request(app)
      .post('/api/submissions')
      .send(payload)
      .expect(201);
    
    const submissionId = res.body._id;

    const savedSubmission = await Submission.findById(submissionId);
    expect(savedSubmission.answer).to.equal(payload.answer);

    const newScore = 9.6;
    const updatedRes = await request(app)
      .put(`/api/submissions/${submissionId}`)
      .send({ score: newScore })
      .expect(200);
    
    expect(updatedRes.body.score).to.equal(newScore);

    const updatedSubmission = await Submission.findById(submissionId);
    expect(updatedSubmission.score).to.equal(newScore);

  });

  it('should delete an existing submission', async () => {
    const payload = {
      taskId: task._id,
      question: task.question,
      answer: 'Sample answer',
      timeLeftInSeconds: 20,
      score: 8.2,
      createdOn: new Date(),
      testId: task._id,
      testName: test.name,
      userId: task._id,
      email: 'chandan@instituteofai.com',
      lastModified: new Date(),
      isEvaluated: true,
    };

    const res = await request(app)
      .post('/api/submissions')
      .send(payload)
      .expect(201);
    
    const submissionId = res.body._id;

    const savedSubmission = await Submission.findById(submissionId);
    expect(savedSubmission.answer).to.equal(payload.answer);

    await request(app)
      .delete(`/api/submissions/${submissionId}`)
      .expect(204);
    
    const deletedSubmission = await Submission.findById(submissionId);
    expect(deletedSubmission).to.be.null;
  });

})