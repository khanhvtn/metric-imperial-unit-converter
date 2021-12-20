"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    const { input: userInput } = req.query;
    const initNum = convertHandler.getNum(userInput);
    if (initNum instanceof Error) {
      return res.send(initNum.message);
    }
    const initUnit = convertHandler.getUnit(userInput);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const result = convertHandler.getString(
      initNum,
      initUnit,
      returnNum,
      returnUnit
    );

    return res.json(result);
  });
};
