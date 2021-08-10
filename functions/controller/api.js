
const BD = require("../config");
const Parse = BD.initializeParse();
const validator = require("../validator/products");

module.exports = {

  isMe: async (req, res) => {
    try {
      const id = req.userId;
      const query = new Parse.Query(BD.UserClass);
      const user = await query.get(id);
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const query = new Parse.Query(BD.ProductClass);
      query.addAscending("createdAt");
      const products = await query.find();
      res.status(200).send(products);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  insertProduct: async (req, res) => {
    try {
      const {valid, msn} = validator.product(req.body);
      if (!valid) {
        res.status(400).sent({error: msn});
      }
      const {name, sku, description, price, brand, tag} = req.body;
      const product = new BD.ProductClass();
      product.set("name", name);
      product.set("sku", sku);
      product.set("description", description);
      product.set("price", price);
      product.set("brand", brand);
      product.set("tag", tag);
      product.set("active", true);
      const result = await product.save();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const query = new Parse.Query(BD.ProductClass);
      const product = await query.get(id);
      res.status(200).send(product);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },

  deleteProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const product = BD.ProductClass.createWithoutData(id);
      product.set("active", false);
      const result = await product.save();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send(error.message);
    }
  },
};
