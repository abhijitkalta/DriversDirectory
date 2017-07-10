const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js').app;

describe('GET /api', () => {
  it('respond with json', (done) => {
    request(server)
      .get('/api')
      .set('Accept', 'application/json')
      .expect(200)
      .expect((res)=>{
        expect(res.body.message).to.equal('hi');
      })
      .end(done);
  });
})
