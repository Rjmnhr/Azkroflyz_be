const LinkedinModel = require("../models/linkedin-model");

const LinkedinController = {
  getData: async (req, res) => {
    try {
      const responseData = await LinkedinModel.getData(req.body);

      return res.status(200).json(responseData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};

module.exports = LinkedinController;
