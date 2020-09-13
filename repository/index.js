// const sequelize = require('./../config/db');
const Models = {
  "note": require('./../models/note')
}

exports.getAll = function (model, cb) {
  const Model = Models[model];
  Models[model].findAll({
    where: {}
  })
  .then(data=>{
    cb(null, data);
  }).catch(err => {
    cd(err);
  });
}

exports.getById = function (model, id, cb) {
  const Model = Models[model];
  Models[model].findByPk(id)
  .then(data=>{
    cb(null, data);
  }).catch(err => {
    cd(err);
  });
}

exports.post = function (model, postData, cb) {
  const Model = Models[model];
    Model.create(postData)
      .then(data => {
        cb(null, data )
      })
      .catch(err => {
        cb(err);
      })
}

exports.put = function (model, putData, id, cb) {
  const Model = Models[model];

  console.log("555555555555555555555")
  console.log(putData)
  console.log("555555555555555555555")

    Model.update(putData, { where: { id: id } })
      .then(rows => {
        cb(null, rows );
      })
      .catch(err => {
        errorHandler(err, cb);
      })
}

exports.delete = function (model, id, cb) {
  const Model = Models[model];
    Model.destroy({ where: { id: id } })
      .then(rows => {
        cb(null, rows);
      })
      .catch(err => {
        cb(err);
      })
  }


// module.exports = Router;
