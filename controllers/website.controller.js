module.exports = {
  index: function (req, res) {
    return res.status(200).render("index", {
      title: "FakeID-API",
    });
  },
};
