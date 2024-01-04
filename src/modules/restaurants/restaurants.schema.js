import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerRestaurantSchema = z.object({
  name: z.string({
    required_error: 'Name is required',
  }),
  address: z.string({
    required_error: 'Address is required',
  }),
  rating: z
    .number({
      required_error: 'Rating is required',
    })
    .min(1, 'Rating must be a value greater than or equal to 1')
    .max(5, 'Rating must be a value less than or equal to 5'),
});

export function validateRestaurantRegister(data) {
  const result = registerRestaurantSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}

export function validateRestaurantUpdate(data) {
  const result = registerRestaurantSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: restaurantData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    restaurantData,
  };
}
