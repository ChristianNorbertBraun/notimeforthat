// tests/part1/cart-summary-test.js
var chai = require('chai');
var fs = require('fs');
var expect = chai.expect; // we are using the "expect" style of Chai
var server = require('../server.js');

describe('ParseEmptyTemplate', function () {
    it('should return the same content', function () {
        expect(server.parseContent("hallo")).to.equal(undefined);
    });
});

describe('ParseRepeat', function () {
    var content = fs.readFileSync("tests/template.html").toString();
    var expectedContent = fs.readFileSync("tests/filledTemplate.html").toString();

    it('should return a filled template', function () {
        expect(expectedContent).to.equal(server.parseContent(content));
    });
});