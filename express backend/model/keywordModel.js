const mongoose = require('mongoose');

const keywordSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'website should have a name'],
    },
    searchCount: { type: Number, default: 0 },
    websites: {
      type: [String],
      validate: {
        validator: function (value) {
          return value && value.length > 0;
        },
        message: 'A keyword must have at least one website',
      },
    },
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Keyword = mongoose.model('Keyword', keywordSchema);

module.exports = Keyword;
