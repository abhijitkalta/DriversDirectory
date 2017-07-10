const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//geojSON format
const PointSchema = new Schema({
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // for any dimension array
      index: '2dsphere'
    }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = {
  Driver
}
