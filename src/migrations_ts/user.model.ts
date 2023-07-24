import db from "./index"


const User = db.sequelize.define('user', {
    email: {
        type: db.Sequelize.STRING,
        unique: true
    },
    name: {
        type: db.Sequelize.STRING
    },
    surname: {
        type: db.Sequelize.STRING
    },
    password: {
        type: db.Sequelize.STRING
    },
    createdAt: {
        type: db.Sequelize.DATE
    },
    updatedAt: {
        type: db.Sequelize.DATE
    }
})

export { User }