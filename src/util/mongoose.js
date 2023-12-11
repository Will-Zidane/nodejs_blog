// Exporting an object with utility functions for handling Mongoose objects

module.exports = {
  // Convert an array of Mongoose documents to an array of plain JavaScript objects
  // If a Mongoose document has a toObject method, use it; otherwise, keep the original object
  multipleMongooseToObject: (mongooses) =>
    mongooses.map((mongoose) => (mongoose && mongoose.toObject ? mongoose.toObject() : mongoose)),

  // Convert a single Mongoose document to a plain JavaScript object
  // If the Mongoose document has a toObject method, use it; otherwise, keep the original object
  mongooseToObject: (mongoose) => (mongoose && mongoose.toObject ? mongoose.toObject() : mongoose),
};
