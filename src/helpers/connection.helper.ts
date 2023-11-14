// const Sequelize = require('sequelize')
// const sequelize = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
//     host: 'localhost',
//     dialect: 'postgres',
//     timezone: 'Europe/Warsaw'
// });

// import { logger } from "../middelwares/logger.middelware"
import { logger } from "../middelwares/loggerEW.middleware"

// import { db, env } from '../migrations/models/index'
import sequelize from '../migrations_ts/index'


import Events from "../migrations_ts/events.model";
import Publishers from "../migrations_ts/publishers.model";
import EventUserRelation from "../migrations_ts/eventUserRelation.model";
import PublisherUserRelation from "../migrations_ts/publisherUserRelation.model";


const connectionTest = async (): Promise<void> => {

    try {
        await sequelize.authenticate();
        logger.info(`Connection has been established successfully.`)
        // console.log('Connection has been established successfully.');
        // logger.info(`Using environment: ${env}`)
        // console.log("Using environment: " + env)

        // Events.findAll()
        // Publishers.findAll()
        // EventUserRelation.findAll()
        // PublisherUserRelation.findAll()

    } catch (error) {
        logger.error(`Unable to connect to the database: ${error}`);
    }
}

export { connectionTest }