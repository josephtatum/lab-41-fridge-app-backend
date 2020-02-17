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

    const arrayOfItems = [{
      name: 'Milk',
      expirationDate: Date.now()
    }];

    return request(app)
      .post('/api/v1/items')
      .send(JSON.stringify(arrayOfItems))
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

  it('can PATCH (UPDATE) an item by ID in the database', () => {
    return request(app)
      .patch(`/api/v1/items/${item.id}`)
      .send({ name: 'Eggs' })
      .then(res => {
        expect(res.body).toEqual({
          __v: 0,
          _id: expect.any(String),
          name: 'Eggs',
          expirationDate: expect.any(String)
        });
      });
  });

  it('can DELETE an item by ID in the database', () => {
    return request(app)
      .delete(`/api/v1/items/${item.id}`)
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
