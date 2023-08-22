import Sequelize from "sequelize"
import sequelize from "./index"
import PublisherUserRelation from "./publisherUserRelation.model"
import EventUserRelation from "./eventUserRelation.model"


const User = sequelize.define('user', {
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    email: {
        type: Sequelize.STRING,
        unique: true,
    },
    name: {
        type: Sequelize.STRING
    },
    surname: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    createdAt: {
        type: Sequelize.DATE
    },
    updatedAt: {
        type: Sequelize.DATE
    }
})

User.belongsTo(PublisherUserRelation,{
    foreignKey: {
        name: 'user_id'
    }
})

User.belongsTo(EventUserRelation,{
    foreignKey: {
        name: 'user_id'
    }
})

export = User 