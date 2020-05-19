const ar = require("../helpers/responses");
const scrape = require("../helpers/scrape");

module.exports = {
  random: function (req, res) {
    scrape.scrapeWebData(req, res, "https://www.fakenamegenerator.com/");
  },

  generateId: function (req, res) {
    if (!req.params.gender && !req.params.nameset && !req.params.country)
      return ar.validationError(res, "Provide all the information.");

    const genders = ["male", "female", "random"];
    const nameset = ["us", "ar", "au", "br", "celat", "ch", "zhtw", "hr", "cs", "dk", "nl", "en", "er", "fi", "fr", "gr", "gl", "sp", "hobbit", "hu", "is", "ig", "it", "jpja", "jp", "tlh", "ninja", "no", "fa", "pl", "ru", "rucyr", "gd", "sl", "sw", "th", "vn"];
    const country = ["au", "as", "bg", "br", "ca", "cyen", "cygk", "cz", "dk", "ee", "fi", "fr", "gr", "gl", "hu", "is", "it", "nl", "nz", "no", "pl", "pt", "sl", "za", "sp", "sw", "sz", "tn", "uk", "us", "uy"];
    if (!genders.includes(req.params.gender))
      return ar.validationError(res, "Provide a correct gender.");
    if (!nameset.includes(req.params.nameset))
      return ar.validationError(res, "Provide a correct name set.");
    if (!country.includes(req.params.country))
      return ar.validationError(res, "Provide a correct country.");

    var url =
      "https://www.fakenamegenerator.com/gen-" +
      req.params.gender +
      "-" +
      req.params.nameset +
      "-" +
      req.params.country +
      ".php";

    scrape.scrapeWebData(req, res, url);
  },
};
