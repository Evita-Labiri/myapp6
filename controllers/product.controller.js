const Product = require('../models/product.model');

exports.findAll = function (req, res) {
  console.log("Find all products");

  Product.find( (err, results) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: results });
		}
	});
};

exports.findOne = function (req, res) {
  
  const id = req.params.id;

  console.log("Find product with id", id);

  Product.findOne({ _id: id }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
	});
};

exports.create = function (req, res) {
  
  const newProduct = new Product ({
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity 
  });

  console.log("insert product with name:", req.body.product);
 
  newProduct.save( (err, result) => {
    if (err) {
			res.json({ status: false, data: err });
		} else {
      res.json({ status: true, data: result });
		}
  });
};


exports.update = function (req, res) {

  const id = req.body._id;

  console.log("Update product with id:", id);

  const updatedProduct = {
    product: req.body.product,
    cost: req.body.cost,
    description: req.body.description,
    quantity: req.body.quantity 
  };

  Product.findOneAndUpdate({ _id: id }, updatedProduct, { new: true }, (err, result) => {
		if (err) {
			res.json({ status: false, data: err });
		} else {
			res.json({ status: true, data: result });
		}
	});
};

exports.delete = function (req, res) {

  const id = req.params.id;

  console.log("Delete product with id", id);

  Product.findOneAndRemove({ _id: id }, (err, result) => {
		if (err) {
      res.json({ status: false, data: err });
    } else {
      res.json({ status: true, data: result });
    }
	}); 
};