//Source:  https://codeforgeek.com/unit-testing-nodejs-application-using-mocha/
var supertest = require("supertest");

// This agent refers to PORT where program is runninng.
var server = supertest.agent("http://localhost:3000");

// UNIT test begin
describe('GET /submit?filename=file.txt', function () {
      it('respond with File and its content', function (done) {
            server
                  .get('/submit?filename=file.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, `Result:\nFile\nthere\r\nis the content\r\nof the text file\r\nu are reading\r\nit right now.`, done);
      });
});

describe('GET /submit?filename=file2.txt (empty)', function () {
      it('respond with File and its content (empty)', function (done) {
            server
                  .get('/submit?filename=file2.txt')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, `Result:\nFile\n`, done);
      });
});

describe('GET /submit?filename=test', function () {
      it('respond with Directory', function (done) {
            server
                  .get('/submit?filename=test')
                  .expect('Content-Type', /text\/plain/)
                  .expect(200, `Result:\nDirectory\nFiles in directory:\n`, done);
      });
});

