//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");
var chai = require('chai');
const { expect } = require("chai");
chai.use(require('chai-json'));
const fs = require('fs');
// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET /', function () {
    it('responds with html', function (done) {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, done);
    });

    it('correct calculations', function (done) {
        server
            .get('/')
            .expect('Content-Type', /html/)
            .expect(200, "\n<h1>1 + 2 = 3</h1>", done);
    });

    it('responds with table of correct calculations', function (done) {
        server
            .get('/json/op')
            .expect('Content-Type', /html/)
            .expect(200, '<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>Your first page</title></head><body><table> <tr> <th>x </th><th>operation </th><th>y </th><th>result</th></tr><tr> <td>3</td><td>+</td><td>5</td><td>8</td></tr><tr> <td>3</td><td>*</td><td>5</td><td>15</td></tr><tr> <td>3</td><td>-</td><td>5</td><td>-2</td></tr><tr> <td>3</td><td>/</td><td>5</td><td>0.6</td></tr></table></body></html>', done);
    });

    it('json is correct', function (done) {
        let rawdata = fs.readFileSync("./json/op.json");
        let json = JSON.parse(rawdata);

        expect("./json/op.json").to.be.a.jsonFile().and.to.be.jsonObj(json);

        done();
    });

    it('correct calculate + route', function (done) {
        server
            .get('/calculate/+/10/10')
            .expect('Content-Type', /html/)
            .expect(200, "<html> <body> <h1>10 + 10 = 20</h1></body></html>", done);
    });

    it('correct calculate div route', function (done) {
        server
            .get('/calculate/div/10/10')
            .expect('Content-Type', /html/)
            .expect(200, "<html> <body> <h1>10 div 10 = 1</h1></body></html>", done);
    });

    it('correct calculate * route', function (done) {
        server
            .get('/calculate/*/10/10')
            .expect('Content-Type', /html/)
            .expect(200, "<html> <body> <h1>10 * 10 = 100</h1></body></html>", done);
    });

    it('correct calculate - route', function (done) {
        server
            .get('/calculate/-/10/10')
            .expect('Content-Type', /html/)
            .expect(200, "<html> <body> <h1>10 - 10 = 0</h1></body></html>", done);
    });

    it('correct results - route', function (done) {
        server
            .get('/results').then(data => {
                expect(data.body.length).greaterThanOrEqual(20);
            })
            done();
    });


});