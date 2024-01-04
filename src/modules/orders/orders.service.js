import mealsModel from '../meals/meals.model.js';
import restaurantsModel from '../restaurants/restaurants.model.js';
import usersModel from '../users/users.model.js';
import ordersModel from './orders.model.js';

export class OrdersServices {
  static async create(data) {
    return await ordersModel.create(data);
  }
  static async update(order) {
    return await order.update({
      status: 'completed',
    });
  }
  static async delete(order) {
    return await order.update({
      status: 'cancelled',
    });
  }
  static async findOneById(id) {
    return await ordersModel.findOne({
      where: {
        id: id,
        status: 'active',
      },
    });
  }
  static async findOneByIdNotValidation(id) {
    return await ordersModel.findOne({
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'createdAt',
          'updatedAt',
          'status',
          'mealId',
          'userId',
        ],
      },
      where: {
        id: id,
      },
      include: [
        {
          model: mealsModel,
          attributes: ['name', 'price'],
          include: [
            {
              model: restaurantsModel,
              attributes: ['name', 'address', 'rating'],
            },
          ],
        },
      ],
    });
  }
  static async findAllbyUserId(userId) {
    return await ordersModel.findAll({
      attributes: {
        exclude: [
          'password',
          'passwordChangedAt',
          'createdAt',
          'updatedAt',
          'status',
          'mealId',
          'userId',
        ],
      },
      where: {
        userId: userId,
      },
      include: [
        {
          model: mealsModel,
          attributes: ['name', 'price'],
          include: [
            {
              model: restaurantsModel,
              attributes: ['name', 'address', 'rating'],
            },
          ],
        },
        // informacion adicional sobre el usuario que ordena la orden
        // {
        //   model: usersModel,
        //   attributes: ['name', 'role'],
        // },
      ],
    });
  }
}
