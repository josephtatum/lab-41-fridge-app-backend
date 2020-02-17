require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');

describe('App Routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST an item to the database', () => {
    return request(app)
      .post('/api/v1/items')
      .send({
        name: 'Milk',
        expirationDate: Date.now()
      })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Milk',
          expirationDate: expect.any(String)
        });
      });

  });

});
