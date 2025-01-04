const express = require('express');
const {
  getWebsite,
  createWebsite,
  getAllWebsites,
  deleteWebsite,
  updateWebsite,
} = require('./../controller/websiteController');

const router = express.Router();

router.route('/:id').get(getWebsite).delete(deleteWebsite).patch(updateWebsite);
router.route('/').post(createWebsite).get(getAllWebsites);

module.exports = router;
