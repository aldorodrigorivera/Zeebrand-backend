module.exports = {
  product: (form) => {
    const {name, price, brand, tag} = form;
    if (!name || name === "") {
      return {valid: false, msn: "Write product name"};
    }
    if (!price || price <= 0) {
      return {valid: false, msn: "Write product price"};
    }
    if (!brand || brand === "") {
      return {valid: false, msn: "Write product brand"};
    }
    if (!tag || tag.length === 0) {
      return {valid: false, msn: "Write product tag"};
    }
    return {valid: true, msn: "OK"};
  },
};
