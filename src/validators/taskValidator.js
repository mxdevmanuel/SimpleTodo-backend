// Task validator using yup
const yup = require('yup');

const createTaskSchema = yup.object({
  title: yup.string().required().min(1).max(200),
  description: yup.string().max(1000),
  project: yup.number().nullable(),
  completed: yup.boolean().default(false),
  archived: yup.boolean().default(false)
});

const editTaskSchema = yup.object({
  title: yup.string().min(1).max(200),
  description: yup.string().max(1000),
  project: yup.number().nullable(),
  completed: yup.boolean().default(false),
  archived: yup.boolean().default(false)
});

module.exports = { createTaskSchema, editTaskSchema };
