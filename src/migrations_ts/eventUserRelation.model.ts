import Sequelize from "sequelize"
import sequelize from "./index"
import { Deferrable } from "sequelize"
import User from "./user.model"
import Events from "./events.model"

const EventUserRelation = sequelize.define('eventUserRelations',{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    },
    event_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Events,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
})

export = EventUserRelation