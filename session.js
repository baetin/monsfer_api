    const session = require('express-session');
    const MySQLStore = require('express-mysql-session')(session);
    const connection = require('./mysql');

    // mysql에도 세션을 등록
    const sessionStore = new MySQLStore({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
    }, connection);

    module.exports = {
        session,
        sessionStore,
    };
