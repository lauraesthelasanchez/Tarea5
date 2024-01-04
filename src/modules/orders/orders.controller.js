import { OrdersServices } from './orders.service.js';
import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateOrderRegister } from './orders.schema.js';
import { MealsServices } from '../meals/meals.service.js';

export const createOrder = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const { hasError, errorMessages, orderData } = validateOrderRegister(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  orderData.userId = sessionUser.id;
  const meal = await MealsServices.findOneById(orderData.mealId);
  if (!meal) {
    return next(
      new AppError(`Meal with the ID: ${orderData.mealId} was not found`, 404)
    );
  }
  const totalPrice = meal.price * orderData.quantity;
  orderData.totalPrice = totalPrice;
  const newOrder = await OrdersServices.create(orderData);
  return res.status(201).json({
    newOrder: {
      id: newOrder.id,
      mealId: newOrder.mealId,
      userId: newOrder.userId,
      quantity: newOrder.quantity,
      totalPrice: newOrder.totalPrice,
    },
  });
});

//TODO MUESTRA TODAS LAS ORDENES DEL USUARIO DUEÑO DEL TOKEN, MUESTRA INFORMACION DE MEAL Y INFO DEL RESTAURANT

export const findAllOrdersFromUser = catchAsync(async (req, res, next) => {
  const { sessionUser } = req;
  const allOrders = await OrdersServices.findAllbyUserId(sessionUser.id);
  return res.status(201).json({ allOrders });
});

export const updateOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  const userUpdated = await OrdersServices.update(order);
  return res.status(200).json(userUpdated);
});

export const deleteOrder = catchAsync(async (req, res, next) => {
  const { order } = req;
  await OrdersServices.delete(order);
  return res.status(204).json();
});
