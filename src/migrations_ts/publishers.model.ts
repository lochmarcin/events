import Sequelize from "sequelize"
import sequelize from "./index"
import EventUserRelation from "./eventUserRelation.model";
import Events from "./events.model";
import PublisherUserRelation from "./publisherUserRelation.model";

// import db from "./index"


const Publishers = sequelize.define("publishers", {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    owner_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

// Publishers.hasMany(EventUserRelation, {
//     foreignKey: "publisher_id"
// });
// EventUserRelation.belongsTo(Publishers)

Publishers.hasMany(Events, {
    foreignKey: "publisher_id",

});
// Events.belongsTo(Publishers)

Publishers.hasMany(PublisherUserRelation, {
    foreignKey:  "publisher_id"
   
});
// PublisherUserRelation.belongsTo(Publishers)



export = Publishers