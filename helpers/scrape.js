const axios = require("axios");
const cheerio = require("cheerio");
const ar = require("./responses");

module.exports = {
  scrapeWebData: function (req, res, url) {
    axios.get(url).then((response) => {
      const $ = cheerio.load(response.data);

      const User = {};

      User.Name = $(".info>.content>.address>h3").text();
      User.Address = $(".info>.content>.address>.adr")
        .html()
        .replace(/<br>/g, ", ")
        .replace(/\s\s+/g, "");

      var aaa = $(".info>.content>.extra")
        .html()
        .replace(/<h3 class="hh3">(.*)<\/h3>/g, "")
        .replace(/\s\s+/g, "")
        .replace(/<dl class="dl-horizontal">/g, "")
        .replace(/<\/dl>/g, "");

      // fetch feature details
      let userDetails = [];

      $(aaa).each((i, el) => {
        userDetails.push(
          $(el)
            .text()
            .replace(
              /This is a real email address. Click here to activate it!/g,
              ""
            )
            .replace(/[\n\t]/g, "")
            .replace(/'/gi, "")
            .trim()
        );
      });

      // Remove empty keys in array and every secend row add as value to key
      let qwe = userDetails
        .filter(Boolean)
        .reduce((total, currentValue, currentIndex, arr) => {
          if (currentIndex % 2 !== 0) {
            total[arr[currentIndex - 1]] = currentValue;
          }
          return total;
        }, {});

      // Replace first letters in key to uppercase and remove spaces
      var key,
        keys = Object.keys(qwe);
      var n = keys.length;
      var newobj = {};
      while (n--) {
        key = keys[n];
        newobj[
          key.replace(/(^\w{1})|(\s{1}\w{1})/g, (match) =>
            match.toUpperCase().replace(/ /g, "")
          )
        ] = qwe[key];
      }
      delete newobj["QRCode"];

      User.Details = newobj;

      //console.log(User);

      return ar.successData(res, "OK", User);

      //return User;
    });
  },
};

//scrapeWebData("http://localhost/~modinfo/a.html");
//scrapeWebData("https://www.fakenamegenerator.com/gen-male-pl-pl.php");
