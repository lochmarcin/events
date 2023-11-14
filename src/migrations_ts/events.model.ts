import Sequelize from "sequelize";
import sequelize from "./index";
import EventUserRelation from "./eventUserRelation.model";

// import db from "./index"

const Events = sequelize.define("events", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  publisher_id: {
    type: Sequelize.INTEGER
  },
  name: {
    type: Sequelize.STRING(50),
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING(500),
    allowNull: true,
  },
  start_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  end_date: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

Events.hasMany(EventUserRelation, {
  foreignKey: "event_id"
});
// EventUserRelation.belongsTo(Events)


export = Events;
