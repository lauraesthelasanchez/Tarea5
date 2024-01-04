import { UsersServices } from './users.service.js';
import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import {
  validateUserLogin,
  validateUserSignup,
  validateUserUpdate,
} from './users.schema.js';
import { generateJWT } from '../../config/plugins/jsonwebtoken.plugin.js';
import { verifyPassword } from '../../config/plugins/bcrypt.plugin.js';
import { OrdersServices } from '../orders/orders.service.js';

export const signup = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserSignup(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const newUser = await UsersServices.create(userData);
  const token = await generateJWT(newUser.id);
  return res.status(201).json({
    token,
    newUser: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
    },
  });
});

export const login = catchAsync(async (req, res, next) => {
  const { hasError, errorMessages, userData } = validateUserLogin(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const user = await UsersServices.findOneByEmail(userData.email);
  if (!user) {
    return next(new AppError('This account does not exist', 404));
  }
  const isCorrectPassword = await verifyPassword(
    userData.password,
    user.password
  );
  if (!isCorrectPassword) {
    return next(new AppError('Incorrect email or password', 401));
  }
  const token = await generateJWT(user.id);
  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
  });
});

export const updateUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  const { hasError, errorMessages, userData } = validateUserUpdate(req.body);
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const userUpdated = await UsersServices.update(user, userData);
  return res.status(200).json(userUpdated);
});

export const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await UsersServices.delete(user);
  return res.status(204).json();
});

export const findAllOrders = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const allOrders = await OrdersServices.findAllbyUserId(sessionUser.id);
  return res.status(201).json({ allOrders });
});

export const findOneOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const order = await OrdersServices.findOneByIdNotValidation(sessionUser.id);
  return res.status(201).json({ order });
});
