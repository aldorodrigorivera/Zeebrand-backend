/* eslint-disable no-undef */

const twilioSID = process.env.TWILIO_SID;
const twilioTOKEN = process.env.TWILIO_TOKEN;
const twilioFROM = process.env.TWILIO_PHONE;
const client = require("twilio")(twilioSID, twilioTOKEN);

Parse.Cloud.beforeSave(("Product"), async (request) => {
  const query = new Parse.Query("Product");
  const product = await query.get(request.object.id);
  // Just in case the product price is changed
  if (product.get("price") !== request.object.get("price")) {
    const query = new Parse.Query("User");
    query.equalTo("rol", "Admin");
    const users = await query.find();
    // All admins user will receive messages notification
    const phones = users.map((user) => user.get("phone"));
    client.messages.create({
      body: `El precio del producto con SKU: ${product.id} ha sido actualizado`,
      from: twilioFROM,
      to: phones,
    }).then((message) => console.log("Mensaje enviados a:", phones))
        .catch((err) => console.error(err));
  }
});
