import mealsModel from '../meals/meals.model.js';
import restaurantsModel from '../restaurants/restaurants.model.js';

export class MealsServices {
  static async create(data) {
    return await mealsModel.create(data);
  }
  static async update(meal, data) {
    return await meal.update(data);
  }
  static async delete(meal) {
    return await meal.update({
      status: 'disabled',
    });
  }
  static async findAll() {
    return await mealsModel.findAll({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'status'],
      },
      where: {
        status: 'active',
      },
      include: [
        {
          model: restaurantsModel,
          attributes: ['id', 'name', 'address', 'rating'],
        },
      ],
    });
  }
  static async findOneById(id) {
    return await mealsModel.findOne({
      attributes: {
        exclude: ['createdAt', 'updatedAt', 'status'],
      },
      where: {
        id: id,
        status: 'active',
      },
      include: [
        {
          model: restaurantsModel,
          attributes: ['id', 'name', 'address', 'rating'],
        },
      ],
    });
  }
}
