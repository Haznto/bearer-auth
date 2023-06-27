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

    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkphbGFsIiwicGFzc3dvcmQiOiIkMmIkMDUkenNIWFFjZFMwVHVLLlRsTVE0RnFyT2JUTU9YZTFkUENYU2d3UXNNN2hIZlhwNlZtTmdkRzYiLCJpYXQiOjE2ODc4Njg2MTF9.DeVpSz1oIFY1Dy6E4O_PuMT8X7alxikawuEqbR3rrbE"

    it('POST to /signup to create a new user.', async () => {
      const res = await req.post('/signup').send({
          username: 'Jalal',
          password: '1234'
        });

        const data = await 
        
        expect(res.status).toBe(201);
        expect(res.body.username).toEqual('Jalal')
        expect( await bcrypt.compare('1234',res.body.password)).toEqual(true)
  });
  it('POST to /signin to login as a user (use basic auth). & Need tests for auth middleware and the routes.', async () => {
    const res = await req
      .post('/signin')
      .set('Authorization', `Basic ${await base64.encode('Jalal:1234')}` )
     
    
    // console.log(res.request._header.authorization); // Log the authorization header value
    expect(res.status).toBe(200); // since Jalal is in the database, the auth middleware will work fine and send 200 status code.
    expect(res.request._header.authorization).toBe('Basic SmFsYWw6MTIzNA==');
    
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
  })