const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

/* 
Units: gal, km, lbs, kg, L, mi
 */
suite("Unit Tests", function () {
  suite("Read number input", function () {
    test("Read a whole number input.", function () {
      assert.strictEqual(convertHandler.getNum("4gal"), 4);
      assert.strictEqual(convertHandler.getNum("4km"), 4);
      assert.strictEqual(convertHandler.getNum("4lbs"), 4);
      assert.strictEqual(convertHandler.getNum("4kg"), 4);
      assert.strictEqual(convertHandler.getNum("4L"), 4);
      assert.strictEqual(convertHandler.getNum("4mi"), 4);
    });
    test("Read a decimal number input.", function () {
      assert.strictEqual(convertHandler.getNum("4.5gal"), 4.5);
      assert.strictEqual(convertHandler.getNum("4.5km"), 4.5);
      assert.strictEqual(convertHandler.getNum("4.5lbs"), 4.5);
      assert.strictEqual(convertHandler.getNum("4.5kg"), 4.5);
      assert.strictEqual(convertHandler.getNum("4.5L"), 4.5);
      assert.strictEqual(convertHandler.getNum("4.5mi"), 4.5);
    });
    test("Read a fractional input.", function () {
      assert.strictEqual(convertHandler.getNum("4/5gal"), 0.8);
      assert.strictEqual(convertHandler.getNum("4/5km"), 0.8);
      assert.strictEqual(convertHandler.getNum("4/5lbs"), 0.8);
      assert.strictEqual(convertHandler.getNum("4/5kg"), 0.8);
      assert.strictEqual(convertHandler.getNum("4/5L"), 0.8);
      assert.strictEqual(convertHandler.getNum("4/5mi"), 0.8);
    });
    test("Read a fractional input with a decimal.", function () {
      assert.strictEqual(convertHandler.getNum("4.5/5gal"), 0.9);
      assert.strictEqual(convertHandler.getNum("4.5/5km"), 0.9);
      assert.strictEqual(convertHandler.getNum("4.5/5lbs"), 0.9);
      assert.strictEqual(convertHandler.getNum("4.5/5kg"), 0.9);
      assert.strictEqual(convertHandler.getNum("4.5/5L"), 0.9);
      assert.strictEqual(convertHandler.getNum("4.5/5mi"), 0.9);
    });
    test("Return an error on a double-fraction (i.e. 3/2/3).", function () {
      assert.instanceOf(convertHandler.getNum("3/2/3"), Error);
    });
    test("Default to a numerical input of 1 when no numerical input is provided", function () {
      assert.strictEqual(convertHandler.getNum("gal"), 1);
      assert.strictEqual(convertHandler.getNum("km"), 1);
      assert.strictEqual(convertHandler.getNum("lbs"), 1);
      assert.strictEqual(convertHandler.getNum("kg"), 1);
      assert.strictEqual(convertHandler.getNum("L"), 1);
      assert.strictEqual(convertHandler.getNum("mi"), 1);
    });
  });
  suite("Read unit input", function () {
    test("Read each valid input unit", function () {
      assert.equal(convertHandler.getUnit("4gal"), "gal");
      assert.equal(convertHandler.getUnit("4km"), "km");
      assert.equal(convertHandler.getUnit("4lbs"), "lbs");
      assert.equal(convertHandler.getUnit("4kg"), "kg");
      assert.equal(convertHandler.getUnit("4L"), "L");
      assert.equal(convertHandler.getUnit("4mi"), "mi");
    });
    test("Return an error for an invalid input unit", function () {
      assert.instanceOf(convertHandler.getUnit("4.5galsda"), Error);
      assert.instanceOf(convertHandler.getUnit("4.5kmasd"), Error);
      assert.instanceOf(convertHandler.getUnit("4.5lbsasd"), Error);
      assert.instanceOf(convertHandler.getUnit("4.5kgasd"), Error);
      assert.instanceOf(convertHandler.getUnit("4"), Error);
    });
    test("Return the correct return unit for each valid input unit", function () {
      assert.equal(convertHandler.getReturnUnit("gal"), "L");
      assert.equal(convertHandler.getReturnUnit("L"), "gal");
      assert.equal(convertHandler.getReturnUnit("km"), "mi");
      assert.equal(convertHandler.getReturnUnit("mi"), "km");
      assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
      assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
    });
    test("Return the spelled-out string unit for each valid input unit", function () {
      assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
      assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
      assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
      assert.equal(convertHandler.spellOutUnit("L"), "liters");
      assert.equal(convertHandler.spellOutUnit("mi"), "miles");
    });
  });
  suite("Converse function", function () {
    test("convert gal to L", function () {
      assert.strictEqual(convertHandler.convert("4", "gal"), 15.14164);
    });
    test("convert L to gal", function () {
      assert.strictEqual(convertHandler.convert("4", "L"), 1.05669);
    });
    test("convert mi to km", function () {
      assert.strictEqual(convertHandler.convert("4", "mi"), 6.43736);
    });
    test("convert km to mi", function () {
      assert.strictEqual(convertHandler.convert("4", "km"), 2.48549);
    });
    test("convert lbs to kg", function () {
      assert.strictEqual(convertHandler.convert("4", "lbs"), 1.81437);
    });
    test("convert kg to lbs", function () {
      assert.strictEqual(convertHandler.convert("4", "kg"), 8.8185);
    });
  });
});
