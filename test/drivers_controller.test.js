const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js').app;
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');
describe('POST /api/drivers', () => {
  it('respond with json', (done) => {
    Driver.count()
    .then((count) => {
      request(server)
        .post('/api/drivers')
        .set('Accept', 'application/json')
        .send({email: 'test@example.com'})
        .expect(200)
        .end(() => {
          Driver.count()
          .then((newCount) => {
            expect(count + 1).to.equal(newCount);
            done();
          })
        });
    })
  });
})
