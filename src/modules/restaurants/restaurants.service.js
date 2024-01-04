import restaurantsModel from './restaurants.model.js';

export class RestaurantsServices {
  static async create(data) {
    return await restaurantsModel.create(data);
  }
  static async update(restaurant, data) {
    return await restaurant.update(data);
  }
  static async delete(restaurant) {
    return await restaurant.update({
      status: 'disabled',
    });
  }
  static async findAll() {
    return await restaurantsModel.findAll({
      where: {
        status: 'active',
      },
    });
  }
  static async findOneById(id) {
    return await restaurantsModel.findOne({
      where: {
        id: id,
        status: 'active',
      },
    });
  }
}
