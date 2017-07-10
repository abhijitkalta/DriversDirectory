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
  drivers.drop(() => {
    done();
  })
});
