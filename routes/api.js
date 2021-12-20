"use strict";

const expect = require("chai").expect;
const ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function (app) {
  let convertHandler = new ConvertHandler();
  app.route("/api/convert").get((req, res) => {
    const { input: userInput } = req.query;
    const initNum = convertHandler.getNum(userInput);
    const initUnit = convertHandler.getUnit(userInput);
    if (initNum instanceof Error && initUnit instanceof Error) {
      return res.send("invalid number and unit");
    }
    if (initNum instanceof Error) {
      return res.send(initNum.message);
    }
    if (initUnit instanceof Error) {
      return res.send(initUnit.message);
    }
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
