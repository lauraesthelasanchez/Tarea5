import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const registerOrderSchema = z.object({
  mealId: z.number({
    required_error: 'Meal ID is required',
  }),
  quantity: z.number({
    required_error: 'Quantity is required',
  }),
});

export function validateOrderRegister(data) {
  const result = registerOrderSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: orderData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    orderData,
  };
}
