/* eslint-disable no-undef */
// This cloud function is located in a parse-server instance
// I added this code here to keep it in Github

const twilioSID = process.env.TWILIO_SID;
const twilioTOKEN = process.env.TWILIO_TOKEN;
const twilioFROM = process.env.TWILIO_PHONE;
const client = require("twilio")(twilioSID, twilioTOKEN);

Parse.Cloud.beforeSave(("Catalog"), async (request) => {
  const query = new Parse.Query("Catalog");
  const product = await query.get(request.object.id);
  // Just in case the product price is changed
  if (product.get("price") !== request.object.get("price")) {
    const query = new Parse.Query("User");
    query.equalTo("rol", "Admin");
    const users = await query.find();
    // All admins user will receive messages notification
    const phones = users.map((user) => user.get("phone"));
    client.messages.create({
      body: `El producto con SKU: ${product.id} (${products.name}) 
      ha sido actualizado, pasando de 
      $${request.object.get("price")}MXN - $${product.price}MXN`,
      from: twilioFROM,
      to: phones,
    }).then((message) => console.log("Mensaje enviados a:", phones))
        .catch((err) => console.error(err));
  }
});
