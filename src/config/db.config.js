module.exports = {
    config: {
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: process.env.DB_DIALECT,
        dialectOptions: {
            useUTC: false,
            dateStrings: true,
            typeCast: true
        },
        timezone: "-03:00"
    },
};