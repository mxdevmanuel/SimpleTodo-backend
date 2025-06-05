// Project validator using yup
const yup = require('yup');

const createProjectSchema = yup.object({
    name: yup.string().required().min(1).max(100)
});

const editProjectSchema = yup.object({
    name: yup.string().min(1).max(100)
});

module.exports = { createProjectSchema, editProjectSchema };
