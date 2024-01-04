import usersModel from '../../modules/users/users.model.js';
import ordersModel from '../../modules/orders/orders.model.js';
import restaurantsModel from '../../modules/restaurants/restaurants.model.js';
import mealsModel from '../../modules/meals/meals.model.js';
import reviewsModel from '../../modules/reviews/reviews.model.js';

export const initModel = () => {
  usersModel.hasMany(ordersModel, { foreignKey: 'userId' });
  ordersModel.belongsTo(usersModel, { foreignKey: 'userId' });

  usersModel.hasMany(reviewsModel, { foreignKey: 'userId' });
  reviewsModel.belongsTo(usersModel, { foreignKey: 'userId' });

  mealsModel.hasOne(ordersModel, { foreignKey: 'mealId' });
  ordersModel.belongsTo(mealsModel, { foreignKey: 'mealId' });

  restaurantsModel.hasMany(mealsModel, { foreignKey: 'restaurantId' });
  mealsModel.belongsTo(restaurantsModel, { foreignKey: 'restaurantId' });

  restaurantsModel.hasMany(reviewsModel, { foreignKey: 'restaurantId' });
  reviewsModel.belongsTo(restaurantsModel, { foreignKey: 'restaurantId' });
};
