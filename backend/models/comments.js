module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define("comments", {
    details: {
      type: DataTypes.STRING,
    },
  });

  return Comments;
};
