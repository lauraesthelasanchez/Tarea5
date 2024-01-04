import { catchAsync } from '../../common/errors/catchAsync.js';
import { validateReviewRegister } from './reviews.schema.js';
import { ReviewsServices } from './reviews.service.js';

export const createReview = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { sessionUser } = req;
  const { hasError, errorMessages, reviewData } = validateReviewRegister(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  reviewData.restaurantId = id;
  reviewData.userId = sessionUser.id;
  const newReview = await ReviewsServices.create(reviewData);
  return res.status(201).json({
    newReview: {
      id: newReview.id,
      userId: newReview.userId,
      restaurantId: newReview.restaurantId,
      comment: newReview.comment,
      rating: newReview.rating,
    },
  });
});

export const updateReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  const { hasError, errorMessages, reviewData } = validateReviewUpdate(
    req.body
  );
  if (hasError) {
    return res.status(422).json({
      status: 'error',
      message: errorMessages,
    });
  }
  const reviewUpdated = await ReviewsServices.update(review, reviewData);
  return res.status(200).json(reviewUpdated);
});

export const deleteReview = catchAsync(async (req, res, next) => {
  const { review } = req;
  await ReviewsServices.delete(review);
  return res.status(204).json();
});
