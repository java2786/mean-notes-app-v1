var express = require('express');
var router = express.Router();

var notesRouter = require('./notes');

// /api/notes
router.use("/notes", notesRouter);

module.exports = router;


