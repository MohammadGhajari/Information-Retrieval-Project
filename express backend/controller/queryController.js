const Query = require('./../model/queryModel');
const {
  getOne,
  createOne,
  getAll,
  deleteOne,
  updateOne,
} = require('./handleFactory');
const catchAsync = require('./../utils/catAsync');

exports.getQuery = getOne(Query);
exports.createQuery = createOne(Query);
exports.getAllQueries = getAll(Query);
exports.deleteQuery = deleteOne(Query);
exports.updateQuery = updateOne(Query);
