var express = require('express');
var router = express.Router();
var repository = require("./../repository")

router.get('/', function (req, res, next) {
  try {
    repository.getAll("note", function (err, data) {
      if(!!err){
        errorHandler(err, res);
      } else {
        res.json({success: true, data: data});
      }
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, message: "Invalid request" })
  }
});
router.get('/:id', function (req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.json({ success: false, message: "invalid url" })
    } else {
      repository.getById("note", id, function (err, data) {
        if(!!err) {
          errorHandler(err, res);
        } else {
          if(data!=null){
            res.json({success: true, data: data});
          } else {
            res.json({success: false, message: "No note found with given id"})
          }
        }
        });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, message: "Invalid request" })
  }
});
router.post('/', function (req, res, next) {
  try {
    repository.post("note", req.body, function (err, data) {
      if(!!err){
        errorHandler(err, res);
      } else {
        res.status(201).json({success: true, createdId: data.id});
      }
    });
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, message: "Invalid request" })
  }
});
router.put('/:id', function (req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id) || id != req.body.id) {
      res.json({ success: false, message: "invalid url" })
    } else {
      repository.put("note", req.body, id, function (err, rows) {
        if(!!err){
          errorHandler(err, res);
        } else {
          res.json({ success: true, message: `${rows} records updated` });
        }
        });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, message: "Invalid request" })
  }
});
router.delete('/:id', function (req, res, next) {
  try {
    let id = req.params.id;
    if (isNaN(id)) {
      res.json({ success: false, message: "invalid url" })
    } else {
      repository.delete("note", id, function (err, rows) {
        if(!!err){
          errorHandler(err, res);
        } else {
          res.json({ success: true, message: `${rows} records deleted` });
        }
      });
    }
  } catch (e) {
    console.log(e);
    res.status(404).json({ success: false, message: "Invalid request" })
  }
});



const errorHandler = function (err, res) {
  // console.log(err);
  res.json({
    success: false,
    err: err,
    message: !!err.parent ? err.parent.sqlMessage : 'Error occurred'
  });
}


module.exports = router;
