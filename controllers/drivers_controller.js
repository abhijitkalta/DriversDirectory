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
    Driver.findByIdAndUpdate({_id: id}, driverProps)
    .then(() => Driver.findById(id))
    .then((driver) => {
      res.status(200).send(driver);
    })
    .catch(next);
  },

  delete(req, res, next){
    const id = req.params.id;
    Driver.findByIdAndRemove(id)
    .then((driver) => {
      res.status(204).send({
        message: "Successfully Deleted!!"
      });
    })
    .catch(next);
  }
}
