import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateMealRegister, validateMealUpdate } from './meals.schema.js';
import { MealsServices } from './meals.service.js';

export const createMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { hasError, errorMessages, mealData } = validateMealRegister(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  mealData.restaurantId = id;
  const newMeal = await MealsServices.create(mealData);
  return res.status(201).json({
    newMeal: {
      id: newMeal.id,
      name: newMeal.name,
      price: newMeal.price,
      restaurantId: newMeal.restaurantId,
    },
  });
});

export const findOneMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  return res.status(200).json(meal);
});

export const updateMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  const { hasError, errorMessages, mealData } = validateMealUpdate(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const mealUpdated = await MealsServices.update(meal, mealData);
  return res.status(200).json(mealUpdated);
});

export const deleteMeal = catchAsync(async (req, res, next) => {
  const { meal } = req;
  await MealsServices.delete(meal);
  return res.status(204).json();
});

export const findAllMeals = catchAsync(async (req, res, next) => {
  const allMeals = await MealsServices.findAll();
  return res.status(200).json({
    message: 'All the meals',
    meals: allMeals,
  });
});
