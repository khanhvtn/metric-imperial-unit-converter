function ConvertHandler() {
  const regexInput =
    /^(\d*[.]{0,1}\d*[/]{0,1}\d*[.]{0,1}\d*|\d+)(gal|km|lbs|kg|L|mi)$/i;
  const regexNum = /^(\d*[.]{0,1}\d*[/]{0,1}\d*[.]{0,1}\d*$|\d+)$/i;
  const regexUnit = /^(gal|km|lbs|kg|L|mi)$/i;
  const invalidInputError = (type) => new Error(`invalid ${type}`);
  this.getNum = function (input) {
    const extractInputNum = input.match(/[\d/.]+/);
    if (extractInputNum) {
      if (!regexNum.test(extractInputNum[0])) {
        return invalidInputError("number");
      }
    } else {
      return 1;
    }

    let result;
    let numInput = extractInputNum[0];
    if (numInput.includes("/")) {
      let [left, right] = numInput.split("/");
      left = left.includes(".") ? parseFloat(left) : parseInt(left);
      right = right.includes(".") ? parseFloat(right) : parseInt(right);
      result = roundedDecimal(left / right);
    } else {
      result = numInput.includes(".")
        ? roundedDecimal(numInput)
        : parseInt(numInput);
    }
    return result;
  };

  this.getUnit = function (input) {
    const extractInputUnit = input.match(/[a-z]+/i);
    if (extractInputUnit) {
      if (!regexUnit.test(extractInputUnit[0])) {
        return invalidInputError("unit");
      }
    } else {
      return invalidInputError("unit");
    }
    let result = extractInputUnit[0];
    return result === "l" ? "L" : result;
  };

  this.getReturnUnit = function (initUnit) {
    //  gal to L.
    //  L to gal.
    //  mi to km.
    //  km to mi.
    //  lbs to kg.
    //  kg to lbs.
    let result =
      initUnit === "gal"
        ? "L"
        : initUnit === "L"
        ? "gal"
        : initUnit === "mi"
        ? "km"
        : initUnit === "km"
        ? "mi"
        : initUnit === "lbs"
        ? "kg"
        : "lbs";

    return result;
  };

  this.spellOutUnit = function (unit) {
    let result =
      unit === "gal"
        ? "gallons"
        : unit === "km"
        ? "kilometers"
        : unit === "lbs"
        ? "pounds"
        : unit === "L" || unit === "l"
        ? "liters"
        : unit === "kg"
        ? "kilograms"
        : "miles";
    return result;
  };

  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    if (initUnit === "gal") {
      result = roundedDecimal(initNum * galToL);
    } else if (initUnit === "km") {
      result = roundedDecimal(initNum / miToKm);
    } else if (initUnit === "lbs") {
      result = roundedDecimal(initNum * lbsToKg);
    } else if (initUnit === "kg") {
      result = roundedDecimal(initNum / lbsToKg);
    } else if (initUnit === "L") {
      result = roundedDecimal(initNum / galToL);
    } else if (initUnit === "mi") {
      result = roundedDecimal(initNum * miToKm);
    }

    return result;
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    // gal, km, lbs, kg, L, mi
    return {
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`,
    };
  };
}

function roundedDecimal(decimalNum) {
  return parseFloat(parseFloat(decimalNum).toFixed(5));
}

module.exports = ConvertHandler;
