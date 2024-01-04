import usersModel from './users.model.js';

export class UsersServices {
  static async create(data) {
    return await usersModel.create(data);
  }
  static async update(user, data) {
    return await user.update(data);
  }
  static async delete(user) {
    return await user.update({
      status: 'disabled',
    });
  }
  static async findOneById(id) {
    return await usersModel.findOne({
      where: {
        id: id,
        status: 'active',
      },
    });
  }
  static async findOneByEmail(email) {
    return await usersModel.findOne({
      where: {
        email: email,
        status: 'active',
      },
    });
  }
}
