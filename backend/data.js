const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.MYSQLHOST,
    database: process.env.MYSQLDATABASE,
    port: process.env.MYSQLPORT,
    user: process.env.MYSQLUSER,
    password: process.env.MYSQLPASSWORD,
});

const handleConnect = function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        throw new Error();
    }

    console.log('connected as id ' + connection.threadId);
};

connection.connect(handleConnect);

const query = async (text, params) => {
    try {
        const res = await new Promise((res, rej) => {
            connection.query(text, params, (err, result) => {
                if (err) rej(err);
                res(result);
            });
        });
        return res;
    } catch (error) {
        console.error(error);
    }
};

module.exports = {
    query,
};
