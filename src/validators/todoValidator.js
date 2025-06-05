// Todo validator using yup
const yup = require('yup');

const createTodoSchema = yup.object({
  title: yup.string().required().min(1).max(200),
  completed: yup.boolean().default(false),
  task: yup.number().nullable()
});

const editTodoSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().min(1).max(200),
  completed: yup.boolean().default(false),
  task: yup.number().nullable()
});

module.exports = { createTodoSchema, editTodoSchema };
