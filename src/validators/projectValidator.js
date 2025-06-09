import yup from 'yup';

const createProjectSchema = yup.object({
    name: yup.string().required().min(1).max(100)
});

const editProjectSchema = yup.object({
    name: yup.string().min(1).max(100)
});

export { createProjectSchema, editProjectSchema };
