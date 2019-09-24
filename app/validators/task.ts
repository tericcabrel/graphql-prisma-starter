import * as yup from 'yup';

const createTaskSchema = yup.object().shape({
  title: yup.string().trim().required().min(3, 'The name is too short'),
  description: yup.string().trim().required(),
  creator: yup.string().trim().required(),
  date: yup.string().trim().required(),
  status: yup.string().trim().required(),
  is_important: yup.boolean().required(),
  user_id: yup.string().required(),
});

export { createTaskSchema };
