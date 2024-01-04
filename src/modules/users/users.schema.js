import z from 'zod';
import { extractValidationData } from '../../common/utils/extractErrorData.js';

const signupUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string({
      required_error: 'Name is required',
    })
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
  role: z.enum(['normal', 'admin']),
});

//rol no sera requerido por medio de validacion en el signup debido a que al hacer esto enviado desde el front, sera enviado como campo vacio para que tomer valor por defecto de normal

//TODO PEDIR TOKEN DE FORMA OPCIONAL AL HACER POST Y SI EL ID ENCRIPTADO EN EL TOKEN ES DE UN USUARIO CUYO ROL ES ADMIN, PUES EL ROL DEL USUARIO CREADO SERA ADMIN

const updateUserSchema = z.object({
  name: z
    .string({
      required_error: 'Name is required',
    })
    .min(2, { message: 'Name is too short' })
    .max(50, { message: 'Name is too long' }),
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
});

const loginUserSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required',
    })
    .email({ message: 'Invalid email' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, { message: 'Password is too long' }),
});

export function validateUserSignup(data) {
  const result = signupUserSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateUserUpdate(data) {
  const result = updateUserSchema.partial().safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}
export function validateUserLogin(data) {
  const result = loginUserSchema.safeParse(data);
  const {
    hasError,
    errorMessages,
    data: userData,
  } = extractValidationData(result);
  return {
    hasError,
    errorMessages,
    userData,
  };
}
