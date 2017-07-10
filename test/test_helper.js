const mongoose = require('mongoose');

before((done) => {
  mongoose.connect('mongodb://localhost/kuber_test');
  mongoose.connection
    .once('open', () => {
      // console.log('Successfull!!');
      done();
    })
    .on('error', (err) => {
      console.log(`Error: ${err}`);
    });
});

beforeEach((done) => {
  const {drivers} = mongoose.connection.collections;
  drivers.drop()
  .then(() =>  drivers.ensureIndex({'geometry.coordinates' : '2dsphere'})) //since test db is dropped everytime, index needs to be recreated or else it only be initialised once
  .then(() => done())
  .catch(() => done());
});
