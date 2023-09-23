const mongoose = require('mongoose');
const Joi = require('joi');

const FruitsModel = require('../models/Fruits');
const ApiError = require('../utils/ApiError');

exports.getAll = async (req, res, next) => {
  try {
    const fruits = await FruitsModel.find({}, { createdAt: 0, updatedAt: 0 });
    return res.status(200).json({
      status: 'success',
      message: 'Data retrieved sucessfully',
      data: fruits,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getSingle = async (req, res, next) => {
  try {
    const fruit = await FruitsModel.findOne(findNameOrId(req.params.value), {
      createdAt: 0,
      updatedAt: 0,
    });
    if (!fruit) {
      return next(
        new ApiError('Resource not found', 404, {
          message: 'The record you requested for does not exist',
        }),
      );
    }
    return res.status(200).json({
      status: 'success',
      message: 'Data retrieved sucessfully',
      data: fruits,
    });
  } catch (error) {
    return next(error);
  }
};
exports.addFruits = async (req, res, next) => {
  try {
    const { error } = validateRequestData(req.body);
    if (error) {
      return next(
        new ApiError('Request Validation Error', 400, {
          message: error.message,
        }),
      );
    }
    const findFruit = await FruitsModel.findOne({
      name: req.body.name,
    });

    if (findFruit) {
      return next(
        new ApiError('Fruit already exist', 400, {
          message: 'A record with the given fruit name exist already',
        }),
      );
    }

    const addFruit = await FruitsModel.create(req.body);

    return res.status(201).json({
      status: 'success',
      message: 'New Fruit Added',
      data: addFruit,
    });
  } catch (error) {
    return next(error);
  }
};
exports.removeFruits = async (req, res, next) => {
  try {
    const fruit = await FruitsModel.findOneAndDelete(
      findNameOrId(req.params.value),
    );

    if (!fruit) {
      return next(
        new ApiError('Resource not found', 404, {
          message: 'The record you requested for does not exist',
        }),
      );
    }

    return res.status(204).json({
      status: 'success',
      message: 'Data retrieved sucessfully',
      data: null,
    });
  } catch (error) {
    return next(error);
  }
};

const validateRequestData = (payload) => {
  const payloadSchema = Joi.object({
    genus: Joi.string().required(),
    name: Joi.string().required(),
    family: Joi.string().required(),
    order: Joi.string().required(),
    nutritions: Joi.object({
      carbohydrates: Joi.number().required(),
      protein: Joi.number().required(),
      fat: Joi.number().required(),
      calories: Joi.number().required(),
      sugar: Joi.number().required(),
    }),
  });

  return payloadSchema.validate(payload);
};

function findNameOrId(payload) {
  return mongoose.Types.ObjectId.isValid(payload)
    ? { _id: new mongoose.Types.ObjectId(payload) }
    : { name: payload };
}
