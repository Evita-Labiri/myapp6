const User = require('../models/user.model');

const logger = require("../logger/logger");

exports.findAll = function (req, res) {
  console.log("Find all users");

  User.find( (err, results) => {
		if (err) {
			res.status(400).json({ status: false, data: err });
      console.log(`Problem in reading users: ${err}`)
		} else {
			res.status(200).json({ status: true, data: results });
      console.log('Success in reading all users');
      // console.info("\x1b[32m",'Info>> Success in reading all users');
      // console.error("\x1b[31m",'Error>> Success in reading all users');
      // console.warn("\x1b[33m",'Warn>> Success in reading all users');
      logger.info("Success in reading all users");
      logger.warn("Success in reading all users");
      logger.error("Success in reading all users");
      logger.log("debug", "Success in reading all users");
      logger.debug("Success in reading all users");
		}
	});
};

exports.findOne = function (req, res) {
  
  const username = req.params.username;

  console.log("Find user with username", username);

  User.findOne({ username: username }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
      errorLog.info(`Problem in finding user: ${username}`);
		} else {
      res.json({ status: true, data: result });
      successlog.info(`Success in finding user: ${username}`);
		}
	});
};

exports.create = function (req, res) {
  
  const newUser = new User ({
    username: req.body.username,
    password: req.body.password,
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone,
    products: req.body.products 
  });

  console.log("insert user with username:", req.body.username);
 
  newUser.save( (err, result) => {
    if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
  });
};


exports.update = function (req, res) {

  const username = req.body.username;

  console.log("Update user with username:", username);

  const updatedUser = {
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    address: req.body.address,
    phone: req.body.phone
  };

  User.findOneAndUpdate({ username: username }, updatedUser, { new: true }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: result });
		}
	});
};

exports.delete = function (req, res) {

  const username = req.params.username;

  console.log("Delete user with username", username);

  User.findOneAndRemove({ username: username }, (err, result) => {
		if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
	}); 
};