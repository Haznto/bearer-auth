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

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbGFsIiwicGFzc3dvcmQiOiIkMmIkMDUkenNIWFFjZFMwVHVLLlRsTVE0RnFyT2JUTU9YZTFkUENYU2d3UXNNN2hIZlhwNlZtTmdkRzYiLCJpYXQiOjE2ODc4MTkwNDR9.lTDPeH57UCOvWaRnQKZFsEGZn1X9w_7RmmMMx8XKuJU"

    it('POST to /signup to create a new user.', async () => {
      const res = await req.post('/signup').send({
          username: 'Jalal',
          password: '1234'
        });

        expect(res.status).toBe(201);
        expect(res.body.username).toEqual('Jalal')
        expect( await bcrypt.compare('1234',res.body.password)).toEqual(true)
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
  

  