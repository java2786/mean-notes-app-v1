var app = require('./../app');
var request = require('supertest');


describe('Service', function () {
    beforeEach(function(){
        // db connection
        // require('./../config/db')
    })
    
   
    describe('business', function () {
        it("should fetch all notes", function (done) {
            request(app)
                .get('/api/notes/')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.success).toBeTrue();
                    // console.log(res.body)
                    done();
                })
                .end(function (err) {
                    console.log(err);
                    expect(err).toBe(null);
                    done();
                })
        })

        it("should delete note with id", function (done) {
            request(app)
                .delete('/api/notes/5')
                .expect('Content-Type', /json/)
                .expect(200)
                .expect(function (res) {
                    expect(res.statusCode).toBe(200);
                    expect(res.body.success).toBeTrue();
                    done();
                })
                .end(function (err) {
                    console.log(err);
                    expect(err).toBe(null);
                    done();
                })
        })

    });
});



