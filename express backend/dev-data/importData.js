const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
const fs = require('fs');
dotenv.config({ path: './config.env' });

const mongoose = require('mongoose');
const User = require('./../model/userModel');
const Keyword = require('./../model/keywordModel');
const Query = require('./../model/queryModel');
const Website = require('./../model/websiteModel');
const cliProgress = require('cli-progress');

mongoose
  .connect('mongodb+srv://mohammad:test1234@samadi.qluzx.mongodb.net/SAMADI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to database');
  });

let queries = JSON.parse(fs.readFileSync(`${__dirname}/queries.json`, 'utf8'));
// let users = JSON.parse(fs.readFileSync(`${__dirname}/users.json`, 'utf8'));
// let hotels = JSON.parse(fs.readFileSync(`${__dirname}/hotels.json`, 'utf8'));
// let rooms = JSON.parse(fs.readFileSync(`${__dirname}/rooms.json`, 'utf8'));
// let reviews = JSON.parse(fs.readFileSync(`${__dirname}/reviews.json`, 'utf8'));

// Batch size for inserting documents
const BATCH_SIZE = 1000;

const calculateRanks = (searchPairs) => {
  const ranks = searchPairs.map((pair) => pair.rank);
  const minRank = Math.min(...ranks);
  const maxRank = Math.max(...ranks);
  const avgRank = Math.floor(
    ranks.reduce((sum, rank) => sum + rank, 0) / ranks.length,
  );
  return { minRank, maxRank, avgRank };
};

// Helper function to batch insert data and show progress
const batchInsert = async (Model, data, hashPassword = false) => {
  const bar = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  const totalBatches = Math.ceil(data.length / BATCH_SIZE);

  console.log(
    `Inserting ${data.length} documents into ${Model.modelName} collection`,
  );

  bar.start(totalBatches, 0);

  for (let i = 0; i < totalBatches; i++) {
    const start = i * BATCH_SIZE;
    const end = Math.min(start + BATCH_SIZE, data.length);
    const batch = data.slice(start, end);

    if (Model.modelName === 'Query') {
      // Preprocess each document to calculate minRank, maxRank, and avgRank
      const processedBatch = batch.map((doc) => {
        const { minRank, maxRank, avgRank } = calculateRanks(doc.searchPairs);
        return { ...doc, minRank, maxRank, avgRank };
      });
      await Model.insertMany(processedBatch);
    } else {
      if (hashPassword && Model.modelName === 'User') {
        for (let j = 0; j < batch.length; j++) {
          console.log(j);
          const hashed = await bcrypt.hash(batch[j].password, 12);
          batch[j].password = hashed;
          batch[j].passwordConfirm = hashed;
        }
      }

      await Model.insertMany(batch);
    }
    bar.update(i + 1);
  }

  bar.stop();
  console.log(`All ${Model.modelName} documents inserted successfully`);
};

const importData = async () => {
  try {
    // await batchInsert(Hotel, hotels);
    // await batchInsert(Room, rooms);
    // await batchInsert(Review, reviews);
    // await batchInsert(User, users, true);
    await batchInsert(Query, queries);
    console.log('Data imported successfully');
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

const deleteData = async () => {
  try {
    await User.deleteMany({});
    await Hotel.deleteMany({});
    await Room.deleteMany({});
    await Review.deleteMany({});
    console.log('Data deleted successfully');
  } catch (error) {
    console.error(error);
  }
  process.exit(0);
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
