const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const Task = require('../models/task.model');

describe('Tasks API', () => {

  // Create a test to add tasks to
  let testId;
  before(async () => {
    const res = await request(app)
      .post('/api/tests')
      .send({ name: 'Test Tasks' })
    testId = res.body._id;
  });

  it('should add a new task to the database', async () => {
    const res = await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question',
        allowedTimeInSeconds: 1200,
        test: testId
      })
      .expect(201);

    expect(res.body).to.haveOwnProperty('_id');
    const taskId = res.body._id;

    const task = await Task.findById(taskId);
    expect(task).not.to.be.null;
  });

  it('should return all tasks for a test', async () => {

    let res = await request(app)
      .get(`/api/tests/${testId}/tasks`)
      .expect(200);

    expect(res.body.tasks).to.be.an('array');
    const previousLength = res.body.tasks.length;
    const expectedLength = previousLength + 1;

    await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question',
        allowedTimeInSeconds: 1200,
        test: testId
      })
      .expect(201);

    res = await request(app)
      .get(`/api/tests/${testId}/tasks`)
      .expect(200)

    expect(res.body.tasks.length).to.equal(expectedLength);

  });

  it('should update details of a task', async () => {

    const res = await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question',
        allowedTimeInSeconds: 1200,
        test: testId
      })
      .expect(201);

    const taskId = res.body._id;

    const newQuestion = 'New question';
    const newTime = 1500;

    const updateRes = await request(app)
      .put(`/api/tests/${testId}/tasks/${taskId}`)
      .send({ question: newQuestion, allowedTimeInSeconds: newTime })
      .expect(200);

    expect(updateRes.body.question).to.equal(newQuestion);
    expect(updateRes.body.allowedTimeInSeconds).to.equal(newTime);

    const updatedTask = await Task.findById(taskId);
    expect(updatedTask.question).to.equal(newQuestion);
    expect(updatedTask.allowedTimeInSeconds).to.equal(newTime);

  });

  it('should delete an existing task', async () => {

    const res = await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question to delete',
        allowedTimeInSeconds: 1200,
        test: testId
      })
      .expect(201);

    const taskId = res.body._id;

    const task = await Task.findById(taskId);
    expect(task).not.to.be.null;

    await request(app)
      .delete(`/api/tests/${testId}/tasks/${taskId}`)
      .expect(204);

    const deletedTask = await Task.findById(taskId);
    expect(deletedTask).to.be.null;

  });

  it('should delete all tasks for a test when the test is deleted', async () => {

    const res = await request(app)
      .post(`/api/tests/${testId}/tasks`)
      .send({
        question: 'Sample question to delete with test',
        allowedTimeInSeconds: 1200,
        test: testId
      })
      .expect(201);

    const taskId = res.body._id;

    await request(app)
      .delete(`/api/tests/${testId}`)
      .expect(204);

    const task = await Task.findById(taskId);
    expect(task).to.be.null;

    const tasks = await Task.find({ test: testId });
    expect(tasks).to.have.length(0);

  });

});