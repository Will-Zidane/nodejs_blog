module.exports = {
  multipleMongooseToObject: (mongooses) =>
    mongooses.map((mongoose) => (mongoose && mongoose.toObject ? mongoose.toObject() : mongoose)),
  
  mongooseToObject: (mongoose) => (mongoose && mongoose.toObject ? mongoose.toObject() : mongoose),
};
