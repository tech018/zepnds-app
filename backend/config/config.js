module.exports = {
  HOST: `${process.env.DB_HOSTNAME}`,
  DB_USER: `${process.env.DB_USERNAME}`,
  DB_PASSWORD: `${process.env.DB_PASSWORD}`,
  DB_NAME: `${process.env.DB_NAME}`,
  dialect: `${process.env.DB_DIALECT}`,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
