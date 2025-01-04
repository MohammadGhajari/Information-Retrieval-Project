const express = require('express');
const {
  getKeyword,
  createKeyword,
  getAllKeywords,
  deleteKeyword,
  updateKeyword,
  uploadKeyword,
} = require('./../controller/keywordController');

const router = express.Router();

router.route('/uploadKeywords').post(uploadKeyword);
router.route('/:id').get(getKeyword).delete(deleteKeyword).patch(updateKeyword);
router.route('/').post(createKeyword).get(getAllKeywords);

module.exports = router;
