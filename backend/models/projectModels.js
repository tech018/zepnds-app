module.exports = (sequelize, DataTypes) => {
  const Project = sequelize.define("project", {
    title: {
      type: DataTypes.STRING,
    },
    details: {
      type: DataTypes.STRING,
    },
    status: {
      type: DataTypes.STRING,
    },
    clientName: {
      type: DataTypes.STRING,
    },
    clientEmail: {
      type: DataTypes.STRING,
    },
    durationStart: {
      type: DataTypes.DATE,
    },
    durationEnd: {
      type: DataTypes.DATE,
    },
    price: {
      type: DataTypes.INTEGER,
    },
  });

  return Project;
};
