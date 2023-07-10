require("dotenv").config();

module.exports = function () {
  return {
    apiUrl: process.env.API_URL,
  };
};
