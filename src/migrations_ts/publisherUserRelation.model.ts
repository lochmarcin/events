import Sequelize from "sequelize"
import sequelize from "./index"
// import User from "./user.model"
// import Publishers from "./publishers.model"

// import db from "./index"


const PublisherUserRelation = sequelize.define("publisher_user_relations",{
    id:{
        type: Sequelize.INTEGER,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    user_id:{
        type: Sequelize.INTEGER,
        allowNull: false
    },
    publisher_id:{
        type: Sequelize.INTEGER,
        allowNull: false

    }
})



export = PublisherUserRelation
