module.exports = {
    database: {
        connectionLimit: 10,
        host:  process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || 'root',
        database: process.env.DB_NAME ||'dbsportsnotes',
        port: process.env.DB_PORT || 3306
    }
};