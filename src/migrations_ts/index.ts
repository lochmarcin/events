
const Sequelize = require('sequelize')
export = new Sequelize(process.env.PGDATABASE, process.env.PGUSER, process.env.PGPASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    // dialectOptions: {
    //     // useUTC: true, //for reading from database
    //     dateStrings: true,
    //     typeCast: function (field, next: NextFunction) { // for reading from database
    //       if (field.type === 'DATETIME') {
    //         return field.string()
    //       }
    //         return next()
    //       },
    //   },
      timezone: 'Europe/Warsaw'
});