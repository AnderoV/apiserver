const dbClient = require('./postgresConfig.js');

let initDB = () => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query('create table if not exists users( \
            id serial primary key, \
            username text, \
            firstname text, \
            lastname text, \
            password text, \
            createdAt text)', (err, result) => {
            if (err) throw console.error(err);
            done();
        });
    });
}

let postUserToDB = (model, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`insert into users (username, firstname, lastname, password, createdAt) values ($1, $2, $3, $4, $5)`,
            [model.username, model.firstname, model.lastname, model.password, model.createdAt], (err, result) => {
            });
        done();
        data = model
        callback(data);
        return data
    });
}

let validateUser = (model, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`select * from users where users.username = '${model.username}' AND users.password = '${model.password}'`,
            (err, result) => {
                if (err) throw console.error(err);
                data = result.rows;
                if (!data) {
                    data = {};
                }
                done();
                callback(data);
                return data;
            });
    });
}

let getUserData = (id, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`select * from users where users.id = ${id}`,
            (err, result) => {
                if (err) throw console.error(err);
                data = result.rows;
                if (!data) {
                    data = {};
                }
                done();
                callback(data);
                return data;
            });
    });
}

let editUserData = (newData, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`update users set password = $1 where id = ${newData.userId}`, [newData.password],
            (err, result) => {
                if (err) throw console.error(err);
                data = result.rows;
                if (!data) {
                    data = {};
                }
                done();
                callback(data);
                return data;
            });
    });
}

module.exports = { initDB, postUserToDB, validateUser, getUserData, editUserData };