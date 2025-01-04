const express = require('express');
const {
  getQuery,
  createQuery,
  getAllQueries,
  deleteQuery,
  updateQuery,
} = require('./../controller/queryController');

const router = express.Router();

router.route('/:id').get(getQuery).delete(deleteQuery).patch(updateQuery);
router.route('/').post(createQuery).get(getAllQueries);

module.exports = router;
