import reviewsModel from './reviews.model.js';

export class ReviewsServices {
  static async create(data) {
    return await reviewsModel.create(data);
  }
  static async update(review, data) {
    return await review.update(data);
  }
  static async delete(review) {
    return await review.update({
      status: 'deleted',
    });
  }
  static async findOneById(id) {
    return await reviewsModel.findOne({
      where: {
        id: id,
        status: 'active',
      },
    });
  }
}
