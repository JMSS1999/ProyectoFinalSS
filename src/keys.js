module.exports = {
    database: {
        connectionLimit: 10,
        host:  process.env.DB_HOST || 'db4free.net',
        user: process.env.DB_USER || 'jhandry',
        password: process.env.DB_PASSWORD || 'jhandry47',
        database: process.env.DB_DATABASE ||'dbsportsnotes',
        port: process.env.DB_PORT || 3306
    }
};
