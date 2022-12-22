const dbConfig = require("../config/config");

const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  dbConfig.DB_NAME,
  dbConfig.DB_USER,
  dbConfig.DB_PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("connected..");
  })
  .catch((err) => {
    console.log("Error" + err);
  });

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./userModels")(sequelize, DataTypes);
db.project = require("./projectModels")(sequelize, DataTypes);
db.issue = require("./issueModels")(sequelize, DataTypes);

db.sequelize.sync({ force: false }).then(() => {
  console.log("yes re-sync done!");
});

db.users.hasMany(db.project, {
  foreignKey: "userId",
  as: "project",
});

db.project.belongsTo(db.users, {
  foreignKey: "userId",
  as: "users",
});

db.project.hasMany(db.issue, {
  foreignKey: "projectId",
  as: "issue",
});

db.issue.belongsTo(db.project, {
  foreignKey: "projectId",
  as: "activity",
});

module.exports = db;
