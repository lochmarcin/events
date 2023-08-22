import Sequelize, { Deferrable } from "sequelize"
import sequelize from "./index"
import User from "./user.model"
import Publishers from "./publishers.model"

const PublisherUserRelation = sequelize.define("publisherUserRelations",{
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
    pubilsher_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Publishers,
            key: 'id',
            deferrable: Deferrable.INITIALLY_IMMEDIATE
        }
    }
})

PublisherUserRelation.

export = PublisherUserRelation
