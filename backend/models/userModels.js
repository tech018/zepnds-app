module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {
      type: DataTypes.STRING,
    },
    name: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    role: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
    },
    otp: {
      type: DataTypes.STRING,
    },
    address: {
      type: DataTypes.TEXT,
    },
    activated: {
      type: DataTypes.BOOLEAN,
    },
  });

  return Users;
};
