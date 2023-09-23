const mongoose = require('mongoose');

const FruitsSchema = new mongoose.Schema(
  {
    genus: String,
    name: { type: String, unique: true },
    family: String,
    order: String,
    nutritions: {
      carbohydrates: Number,
      protein: Number,
      fat: Number,
      calories: Number,
      sugar: Number,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

module.exports = mongoose.model('Fruits', FruitsSchema);
