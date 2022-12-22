const yup = require("yup");

const issueSchema = yup.object({
  body: yup.object({
    title: yup.string().required().min(8),
    details: yup.string().min(8).max(100000000).required(),
    assigneeId: yup.number().required(),
    reporterId: yup.number().required(),
    prioLevel: yup.number().required(),
    isOpen: yup.boolean().required(),
    projectId: yup.number().required(),
  }),
});

module.exports = issueSchema;
