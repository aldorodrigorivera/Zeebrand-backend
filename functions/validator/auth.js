/* eslint-disable no-useless-escape */

module.exports = {
  // This function is just to valid the input.
  singUp: (form) => {
    const {email, password, name, phone} = form;
    const validEmail = "/\S+@\S+\.\S+/";

    if (!email || validEmail.match(email)) {
      return {valid: false, msn: "Write a valid email address"};
    }
    if (!password || password.length < 4) {
      return {valid: false, msn: "Your password must be at least 4 characters"};
    }
    if (!name || name.length < 2) {
      return {valid: false, msn: "Write your name"};
    }
    if (!phone || phone.length <= 9 || phone.length >= 11) {
      return {valid: false, msn: "Write valid phone number (10 Caracters)"};
    }
    return {valid: true, msn: "OK"};
  },
};
