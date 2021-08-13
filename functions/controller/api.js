
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
      res.status(400).send({error});
    }
  },

  getAllProducts: async (req, res) => {
    try {
      const query = new Parse.Query(BD.ProductClass);
      query.addAscending("createdAt");
      query.equalTo("active", true);
      const products = await query.find();
      res.status(200).send(products);
    } catch (error) {
      res.status(400).send({error});
    }
  },

  insertProduct: async (req, res) => {
    try {
      const {valid, msn} = validator.product(req.body);
      if (!valid) {
        res.status(400).send({error: msn});
      }
      const {name, price, brand, tag, url} = req.body;
      const product = new BD.ProductClass();
      product.set("name", name);
      product.set("price", price);
      product.set("brand", brand);
      product.set("url", url);
      product.set("tag", tag);
      product.set("active", true);
      const result = await product.save({useMasterKey: true});
      res.status(200).send(result);
    } catch (error) {
      console.log({error});
      res.status(400).send({error});
    }
  },

  updateProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const {valid, msn} = validator.product(req.body);
      if (!valid) {
        res.status(400).send({error: msn});
      }
      const {name, price, brand, tag, active, url} = req.body;
      const product = BD.ProductClass.createWithoutData(id);
      product.set("name", name);
      product.set("price", price);
      product.set("brand", brand);
      product.set("tag", tag);
      product.set("url", url);
      product.set("active", active);
      const result = await product.save();
      res.status(200).send(result);
    } catch (error) {
      res.status(400).send({error});
    }
  },

  getProduct: async (req, res) => {
    try {
      const id = req.params.id;
      const query = new Parse.Query(BD.ProductClass);
      const product = await query.get(id);
      res.status(200).send(product);
    } catch (error) {
      res.status(400).send({error});
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
      res.status(400).send({error});
    }
  },
};
