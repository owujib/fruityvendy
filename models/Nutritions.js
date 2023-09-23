const mongoose = require('mongoose');

const NutritionsSchema = mongoose.Schema(
  {
    carbohydrates: Number,
    protein: Number,
    fat: Number,
    calories: Number,
    sugar: Number,
    fruit_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Fruits',
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

module.exports = mongoose.model('Nutritions', NutritionsSchema);
