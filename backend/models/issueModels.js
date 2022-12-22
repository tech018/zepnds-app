module.exports = (sequelize, DataTypes) => {
  const Issue = sequelize.define("issue", {
    title: {
      type: DataTypes.STRING,
    },
    assigneeId: {
      type: DataTypes.INTEGER,
    },
    reporterId: {
      type: DataTypes.INTEGER,
    },
    details: {
      type: DataTypes.STRING,
    },
    prioLevel: {
      type: DataTypes.INTEGER,
    },
    status: {
      type: DataTypes.STRING,
    },
    isOpen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  });

  return Issue;
};
