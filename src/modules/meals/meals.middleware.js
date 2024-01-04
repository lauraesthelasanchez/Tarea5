import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { MealsServices } from './meals.service.js';

export const validateExistMeal = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const meal = await MealsServices.findOneById(id);
  console.log(meal);
  if (!meal) {
    return next(new AppError(`Meal with the ID: ${id} was not found`, 404));
  }
  if (meal.status !== 'active') {
    return next(new AppError(`Meal with the ID: ${id} is not active`, 409));
  }
  req.meal = meal;
  next();
});
