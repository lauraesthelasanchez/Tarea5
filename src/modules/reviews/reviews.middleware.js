import { AppError } from '../../common/errors/appError.js';
import { catchAsync } from '../../common/errors/catchAsync.js';
import { ReviewsServices } from './reviews.service.js';

export const validateExistReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await ReviewsServices.findOneById(id);
  if (!review) {
    return next(new AppError(`Review with the ID: ${id} was not found`, 404));
  }
  if (review.status !== 'active') {
    return next(new AppError(`Review with the ID: ${id} is not active`, 409));
  }
  req.review = review;
  next();
});

export const protectReviewOwner = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const review = await ReviewsServices.findOneById(id);
  if (!review) {
    return next(new AppError(`Review with the ID: ${id} was not found`, 404));
  }
  const { sessionUser } = req;
  if (review.userId !== sessionUser.id) {
    return next(new AppError('You do not own this review', 401));
  }
  next();
});
