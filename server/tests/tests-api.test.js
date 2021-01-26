const { expect } = require('chai');
const request = require('supertest');
const app = require('../app');
const Test = require('../models/test.model');

describe('Tests API', () => {
  it('should add new test to database', async () => {
    const payload = {
      name: 'IELTS - General',
    };
    const res = await request(app)
      .post('/api/tests')
      .send(payload)
      .expect(201);

    expect(res.body).to.haveOwnProperty('name', payload.name);
    const savedTest = await Test.findById(res.body._id);
    expect(savedTest.name).to.equal(payload.name);
  });

  it('should return newly created tests', async () => {

    let res = await request(app)
      .get('/api/tests')
      .expect(200);

    expect(res.body.tests).to.be.an('array');
    const previousLength = res.body.tests.length;
    const expectedLength = previousLength + 1;

    await request(app)
      .post('/api/tests')
      .send({ name: 'Test Name' })
      .expect(201);

    res = await request(app)
      .get('/api/tests')
      .expect(200)

    expect(res.body.tests.length).to.equal(expectedLength);

  });
});
