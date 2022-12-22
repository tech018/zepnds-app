const yup = require("yup");

const projectSchema = yup.object({
  body: yup.object({
    title: yup.string().required().min(8),
    details: yup.string().min(8).max(255).required(),
    clientName: yup.string().min(8).max(255).required(),
    clientStatus: yup.string().required(),
    durationStart: yup.date().required(),
    durationEnd: yup.date().required(),
    price: yup.number().required(),
  }),
  params: yup.object({
    id: yup.number().required(),
  }),
});

module.exports = projectSchema;
