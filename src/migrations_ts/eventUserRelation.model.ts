import Sequelize from "sequelize"
import sequelize from "./index"
import User from "./user.model"
import Events from "./events.model"
// import { Deferrable } from "sequelize"
// import User from "./user.model"
// import Events from "./events.model"

// import db from "./index"


const EventUserRelation = sequelize.define('event_user_relations', {
    id: {
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: false
        // ,
        // references: {
        //     model: User,
        //     key: "id"
        // }
    },
    event_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    indexes: [{ unique: true, fields: ['user_id', 'event_id'] }]
})




export = EventUserRelation