module.exports = {
  product: (form) => {
    const {name, sku, description, price, brand, tag} = form;
    if (!name || name === "") {
      return {valid: false, msn: "Write product name"};
    }
    if (!sku || sku === "") {
      return {valid: false, msn: "Write product sku"};
    }
    if (!description || description === "") {
      return {valid: false, msn: "Write product description"};
    }
    if (!price || price === "") {
      return {valid: false, msn: "Write product price"};
    }
    if (!brand || brand === "") {
      return {valid: false, msn: "Write product brand"};
    }
    if (!tag || tag === "") {
      return {valid: false, msn: "Write product tag"};
    }
    return {valid: true, msn: "OK"};
  },
};
