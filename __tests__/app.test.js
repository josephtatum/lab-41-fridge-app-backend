require('dotenv').config();

const request = require('supertest');
const app = require('../lib/app');
const connect = require('../lib/utils/connect');
const mongoose = require('mongoose');
const Item = require('../lib/models/Item')

describe('App Routes', () => {
  beforeAll(() => {
    connect();
  });

  beforeEach(() => {
    return mongoose.connection.dropDatabase();
  });

  let item;
  beforeEach(async() => {
    item = await Item.create({
      name: 'Milk',
      expirationDate: Date.now()
    });
  });

  afterAll(() => {
    return mongoose.connection.close();
  });

  it('can POST an item to the database', async() => {

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

  it('can GET all items from the database', () => {
    return request(app)
      .get('/api/v1/items')
      .then(res => {
        expect(res.body).toContainEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Milk',
          expirationDate: expect.any(String)
        });
      });
  });

  it('can GET an item by ID from the database', () => {
    return request(app)
      .get(`/api/v1/items/${item.id}`)
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
