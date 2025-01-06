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

const calculateRanks = (searchPairs) => {
  const ranks = searchPairs.map((pair) => pair.rank);
  const minRank = Math.min(...ranks);
  const maxRank = Math.max(...ranks);
  const avgRank = Math.floor(
    ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length,
  );
  return { minRank, maxRank, avgRank };
};
querySchema.pre('save', function (next) {
  console.log(this.searchPairs); //not printed
  const { minRank, maxRank, avgRank } = calculateRanks(this.searchPairs);
  this.minRank = minRank;
  this.maxRank = maxRank;
  this.avgRank = avgRank;
  next();
});

// Middleware to update ranks on document updates
querySchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate(); //not printed
  console.log(update);

  if (update.searchPairs) {
    const { minRank, maxRank, avgRank } = calculateRanks(update.searchPairs);
    this.set({ minRank, maxRank, avgRank });
    console.log(minRank, maxRank);
  }
  next();
});
const Query = mongoose.model('Query', querySchema);

module.exports = Query;
