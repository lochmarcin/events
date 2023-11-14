const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.PGDATABASE,
  process.env.PGUSER,
  process.env.PGPASSWORD,
  {
    host: "localhost",
    dialect: "postgres",
    timezone: "Europe/Warsaw",
  }
);

// sequelize.sync({ force: true })
// sequelize.sync({ alter: true })


export default sequelize
