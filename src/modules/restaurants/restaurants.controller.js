import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  validateRestaurantRegister,
  validateRestaurantUpdate,
} from './restaurants.schema.js';
import { RestaurantsServices } from './restaurants.service.js';

export const createRestaurant = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, restaurantData } =
    validateRestaurantRegister(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const newRestaurant = await RestaurantsServices.create(restaurantData);
  return res.status(201).json({
    newUser: {
      id: newRestaurant.id,
      name: newRestaurant.name,
      address: newRestaurant.address,
      rating: newRestaurant.rating,
    },
  });
});

export const findAllRestaurants = catchAsync(async (req, res, next) => {
  const allRestaurants = await RestaurantsServices.findAll();
  return res.status(200).json(allRestaurants);
});

export const findOneRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  return res.status(200).json(restaurant);
});

export const updateRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  const { hasError, errorMessages, restaurantData } = validateRestaurantUpdate(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const restaurantUpdated = await RestaurantsServices.update(
    restaurant,
    restaurantData
  );
  return res.status(200).json(restaurantUpdated);
});

export const deleteRestaurant = catchAsync(async (req, res, next) => {
  const { restaurant } = req;
  await RestaurantsServices.delete(restaurant);
  return res.status(204).json();
});
