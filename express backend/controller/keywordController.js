const Keyword = require('./../model/keywordModel');
const Query = require('./../model/queryModel');
const {
  getOne,
  createOne,
  getAll,
  deleteOne,
  updateOne,
} = require('./handleFactory');
const catchAsync = require('./../utils/catAsync');
const multer = require('multer');
const XLSX = require('xlsx');

// Multer configuration
const upload = multer({
  dest: 'uploads/', // Folder to store uploaded files temporarily
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(xls|xlsx)$/)) {
      return cb(new Error('Please upload an Excel file'), false);
    }
    cb(null, true);
  },
});

// Middleware for file upload
const uploadSingle = upload.single('file'); // Expecting a 'file' field in the request

exports.getKeyword = getOne(Keyword);
exports.createKeyword = createOne(Keyword);
exports.getAllKeywords = getAll(Keyword);
exports.deleteKeyword = deleteOne(Keyword);
exports.updateKeyword = updateOne(Keyword);

exports.uploadKeyword = catchAsync(async (req, res, next) => {
  uploadSingle(req, res, async (err) => {
    if (err) {
      return next(err); // Handle any multer errors
    }

    if (!req.file) {
      return res
        .status(400)
        .json({ status: 'fail', message: 'No file uploaded' });
    }

    // Read and parse the Excel file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0]; // Get the first sheet
    const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    for (let i = 0; i < sheetData.length; i++) {
      const keyword = sheetData[i].keyword;
      const websites = sheetData[i].sites.split(', ');
      await Keyword.create({ name: keyword, websites });
      //create queries
      for (let j = 0; j < websites.length; j++) {
        await Query.create({ query: keyword, website: websites[j] });
      }
    }

    // Respond with the parsed data or process it as needed
    res.status(200).json({
      status: 'success',
      data: sheetData,
    });
  });
});
