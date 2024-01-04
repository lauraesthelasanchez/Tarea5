import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerReviewchema = z.object({
  comment: z.string({
    required_error: 'Comment is required',
  }),
  rating: z.number({
    required_error: 'Rating is required',
  }),
});

export function validateReviewRegister(data) {
  const result = registerReviewchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    reviewData,
  };
}

export function validateReviewUpdate(data) {
  const result = registerReviewchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: reviewData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    reviewData,
  };
}
