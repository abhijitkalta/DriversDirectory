const Driver = require('../models/driver').Driver;

module.exports = {
  welcome(req, res){
    res.render('welcome', {
      message: 'Welcome to my page'
    })
  },

  greeting(req, res){
    res.status(200).json({
      message: 'hi'
    })
  },

  create(req, res, next){
    const driverProps = req.body;
    const driver = new Driver(driverProps);
    driver.save()
    .then((driver) => {
      res.status(200).send(driver);
    })
    .catch(next);
  },

  edit(req, res, next){
    const id = req.params.id;
    const driverProps = req.body;
    driver.update({_id: id}, driverProps)
    .then(() => findById(id))
    .then((driver) => {
      res.status(200).send(driver);
    })
    .catch(next);
  }
}
