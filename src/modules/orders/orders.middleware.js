import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { OrdersServices } from './orders.service.js';

export const validateExistOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await OrdersServices.findOneById(id);
  if (!order) {
    return next(new AppError(`Order with the ID: ${id} was not found`, 404));
  }
  if (order.status !== 'active') {
    return next(new AppError(`Order with the ID: ${id} is not active`, 409));
  }
  req.order = order;
  next();
});

export const protectOrderOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const order = await OrdersServices.findOneById(id);
  if (!order) {
    return next(new AppError(`Order with the ID: ${id} was not found`, 404));
  }
  const { sessionUser } = req;
  if (order.userId !== sessionUser.id) {
    return next(new AppError('You do not own this order', 401));
  }
  next();
});
