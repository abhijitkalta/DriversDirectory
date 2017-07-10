const expect = require('chai').expect;
const request = require('supertest');
const server = require('../server.js').app;
const mongoose = require('mongoose');

const Driver = mongoose.model('driver');
describe('Test drivers api', () => {
  it('POST to api/drivers', (done) => {
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

  it('PUT to api/drivers/:id', (done) => {
    const driver = new Driver({
      email: 'test@example.com',
      driving: false
    });

    driver.save()
    .then(() => {
      request(server)
      .put('/api/drivers/' + driver._id)
      .send({driving: true})
      .end(() => {
        Driver.findById(driver._id)
        .then((driver) => {
          expect(driver.driving).to.equal(true);
          done();
        })
      })
    })
  });

  it('Deletes driver at api/drivers/:id', (done) => {
    const driver = new Driver({
      email: 'test@example.com',
      driving: false
    });

    driver.save()
    .then(() => {
      Driver.count()
      .then((count) => {
        request(server)
          .del('/api/drivers/' + driver._id)
          .expect(200)
          .end(() => {
            Driver.count()
            .then((newCount) => {
              expect(count).to.equal(newCount + 1);
              done();
            })
          });
      })
    })

  });

  it('Gets all drivers based on lat and long', (done) => {
    const qDriver = new Driver({
      email: 'qDriver@test.com',
      driving: true,
      geometry: {
        type: 'Point',
        coordinates: [-80.1, 25.5]
      }
    });

    const sDriver = new Driver({
      email: 'sDriver@test.com',
      driving: true,
      geometry: {
        type: 'Point',
        coordinates: [-122.1, 47.14]
      }
    });

    Promise.all([qDriver.save(), sDriver.save()])
    .then((drivers) => {
      request(server)
      .get('/api/drivers?lng=-80&lat=25')
      .end((err, res) => {
        expect(res.body.length).to.equal(1);
        expect(res.body[0].obj.email).to.equal('qDriver@test.com');
        done();
      })
    })
  })
})
