var app = require('./../app');
var request = require('supertest');

describe('routes', function () {
describe('boundary', function () {

        it("should return 404 with url /app", function (done) {
            request(app)
                .get('/app')
                .expect(function (res) {
                    expect(res.statusCode).toBe(404);
                    done();
                })
                .end(function (err) {
                    console.log(err);
                    expect(err).toBe(null);
                    done();
                })
        })

        it("should return home page with url '/'", function (done) {
            request(app)
                .get('/')
                .expect('Content-Type', /html/)
                .expect(200)
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(res.text).toContain('NotesApp');
                    expect()
                    done();
                })
                .end(function (err) {
                    console.log(err);
                    expect(err).toBe(null);
                    done();
                })
        })

    })
})