const mongoose = require('mongoose');

const querySchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: [true, 'website should have a name'],
    },
    website: {
      type: String,
      required: [true, 'A query should have a website'],
    },
    minRank: {
      type: Number,
    },
    maxRank: {
      type: Number,
    },
    avgRank: {
      type: Number,
    },
    searchPairs: [
      {
        time: {
          type: Date,
          required: true,
          default: Date.now,
        },
        rank: {
          type: Number,
          required: true,
        },
      },
    ],
    suggestedQueries: [String],
  },

  { toJSON: { virtuals: true }, toObject: { virtuals: true } },
);

querySchema.post('findOneAndUpdate', async function (doc) {
  if (doc && doc.searchPairs && doc.searchPairs.length > 0) {
    const ranks = doc.searchPairs.map((pair) => pair.rank);
    doc.minRank = Math.min(...ranks);
    doc.maxRank = Math.max(...ranks);
    doc.avgRank = Math.floor(
      ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length,
    );

    await doc.save();
  }
});
const Query = mongoose.model('Query', querySchema);

module.exports = Query;
