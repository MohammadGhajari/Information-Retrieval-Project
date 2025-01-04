const Website = require('./../model/websiteModel');
const {
  getOne,
  createOne,
  getAll,
  deleteOne,
  updateOne,
} = require('./handleFactory');
const catchAsync = require('./../utils/catAsync');

exports.getWebsite = getOne(Website);
exports.createWebsite = createOne(Website);
exports.getAllWebsites = getAll(Website);
exports.deleteWebsite = deleteOne(Website);
exports.updateWebsite = updateOne(Website);
