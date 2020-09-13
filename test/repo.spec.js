let repo = require("./../repository");

describe('Repository', function () {

    beforeEach(function () {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 5000;
    })

    describe('business', function () {

        it("should post note", function (done) {
            let now = Date.now();
            let note = {
                title: "title-" + now,
                description: "desc-" + now,
                author: "Some author name"
            }

            repo.post("note", note, function (err, result) {
                expect(err).toBeNull();
                expect(result).toBeDefined();
                done();
            });

        });

        it("should get all notes", function (done) {
            repo.getAll("note", function (err, results) {
                expect(err).toBeNull();
                expect(results).toBeDefined();
                done();
            });

        });

        it("should post note without status", function (done) {
            let now = Date.now();
            let note = {
                description: "desc-" + now,
                title: "title-"+now,
                author: "Some author name"
            }

            repo.post("note", note, function (err, result) {
                expect(err).toBeNull();
                done();
            });

        });

    });


    describe('exception', function () {

        it("should not post note without title", function (done) {
            let now = Date.now();
            let note = {
                description: "desc-" + now,
                author: "Some author name"
            }

            repo.post("note", note, function (err, result) {
                expect(err).not.toBeNull();
                done();
            });

        });

        it("should not post note without author", function (done) {
            let now = Date.now();
            let note = {
                description: "desc-" + now,
                title: "title-"+now
            }

            repo.post("note", note, function (err, result) {
                expect(err).not.toBeNull();
                done();
            });

        });

    });
});



