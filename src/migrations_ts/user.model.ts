import Sequelize from "sequelize";
import sequelize from "./index";
import EventUserRelation from "./eventUserRelation.model";
import PublisherUserRelation from "./publisherUserRelation.model";
import Publishers from "./publishers.model";

import { StopExecQuery } from "../exceptions/StopExecQuery.exception";
import { APIUser } from "../repositories/users.repository"

// import db from "./index"

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  surname: {
    type: Sequelize.STRING,
  },
  password: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  }
}, {
  hooks: {
    beforeFind: (options: APIUser) => {
      // console.log("hooks: => beforeFind ELO !!!")
      // console.log(options)
      // return "Dupa" 
      // throw new StopExecQuery()
    }
  }
});

User.hasMany(EventUserRelation, {
  foreignKey: "user_id"
});
// EventUserRelation.belongsTo(User)
EventUserRelation.belongsTo(User, { foreignKey: 'user_id' })


User.hasMany(PublisherUserRelation, {
  foreignKey: "user_id"
});
// PublisherUserRelation.belongsTo(User)

User.hasMany(Publishers, {
  foreignKey: "owner_id"
})
// Publishers.belongsTo(User)


export = User;