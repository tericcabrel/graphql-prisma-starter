import * as yup from 'yup';

const createUserSchema = yup.object().shape({
  name: yup.string().trim().required().min(3, 'The name is too short'),
  email: yup.string().trim().required().email('Adress email is invalid'),
  password: yup.string().trim().required().min(8, 'The password must have at least 8 characters'),
});

export { createUserSchema };
