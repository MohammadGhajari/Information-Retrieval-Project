const mongoose = require('mongoose');

const websiteSchema = new mongoose.Schema(
  {
    domain: {
      unique: true,
      type: String,
      required: [true, 'website should have a domain'],
    },
    name: {
      type: String,
      required: [true, 'website should have a name'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

const Website = mongoose.model('Website', websiteSchema);

module.exports = Website;
