import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { RestaurantsServices } from '../restaurants/restaurants.service.js';

export const validateExistRestaurant = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const restaurant = await RestaurantsServices.findOneById(id);
  if (!restaurant) {
    return next(
      new AppError(`Restaurant with the ID: ${id} was not found`, 404)
    );
  }
  if (restaurant.status !== 'active') {
    return next(
      new AppError(`Restaurant with the ID: ${id} is not active`, 409)
    );
  }
  req.restaurant = restaurant;
  next();
});
