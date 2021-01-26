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
});
