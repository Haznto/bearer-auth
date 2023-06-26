"use strict"

require('dotenv').config();
const base64 = require('base-64')
const bcrypt = require('bcrypt')
const {app} = require('../src/server');
const supertest = require('supertest');
const req = supertest(app);
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
  })

afterAll(async () => {
    
    await db.drop();
  })

  describe('testing the server', () => {

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlNhZWVkIiwicGFzc3dvcmQiOiIkMmIkMDUkWW4wNklnZEU1VlRaY04waDQyTkRYdTBpN0FjTHNScVpTRFpQdGRReS5sdExhRzZJNjJzSUMiLCJpYXQiOjE2ODc4MjAwNzh9.E9y3YDQ3ZoEisYSZXeexSzZA_UTcXNYinV3Kq0oOWGA"

    it('POST to /signup to create a new user.', async () => {
      const res = await req.post('/signup').send({
          username: 'Saeed',
          password: '12345'
        });

        expect(res.status).toBe(201);
        expect(res.body.username).toEqual('Saeed')
        expect( await bcrypt.compare('12345',res.body.password)).toEqual(true)
  });

    it('should successfully access an authenticated route', async () => {
      const res = await req
        .get('/secretstuff')
        .set('Authorization', `Bearer ${token}`);
  
      // Assert the expected behavior based on the authentication status
      expect(res.status).toBe(200);
      // ...
    });
  
    it('should fail to access an authenticated route without a token', async () => {
      const res = await req
        .get('/secretstuff');
  
      // Assert the expected behavior based on the authentication status
      expect(res.status).toBe(500);
      // ...
    });
  
    // Additional test cases for different authentication scenarios
  });
  

  