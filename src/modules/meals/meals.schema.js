import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerMealSchema = z.object({
  name: z.string({
    required_error: 'Meal is required',
  }),
  price: z.number({
    required_error: 'Price is required',
  }),
});

export function validateMealRegister(data) {
  const result = registerMealSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    mealData,
  };
}

export function validateMealUpdate(data) {
  const result = registerMealSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: mealData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    mealData,
  };
}
