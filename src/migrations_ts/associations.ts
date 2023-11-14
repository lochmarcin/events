import { Sequelize } from "sequelize";
import sequelize from "./index";



// const Events = require("./events.model")
// const User = require("./user.model")
// const Publishers = require("./publishers.model")
// const EventUserRelation = require("./eventUserRelation.model")
// const PublisherUserRelation = require("./publisherUserRelation.model")

// function associations(sequelize: any) {
// //   const { Events, User, Publishers, EventUserRelation, PublisherUserRelation } = sequelize.models;

//   User.hasMany(PublisherUserRelation, {
//     foreignKey: {
//       name: "user_id",
//     },
//   });

//   User.hasMany(EventUserRelation, {
//     foreignKey: {
//       name: "user_id",
//     },
//   });

//   Events.hasMany(EventUserRelation, {
//     foreignKey: {
//       name: "event_id",
//     },
//   });

//   Publishers.hasMany(EventUserRelation, {
//     foreignKey: {
//       name: "pubilsher_id",
//     },
//   });

//   Publishers.hasMany(Events, {
//     foreignKey: {
//       name: "pubilsher_id",
//     },
//   });

//   Publishers.hasMany(PublisherUserRelation, {
//     foreignKey: {
//       name: "pubilsher_id",
//     },
//   });
// }

// export default associations