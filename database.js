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

let deleteRadioById = (table, id, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`delete from ${table} where id = ${id}`,
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

let postPubRuleToDB = (table, rule, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`insert into ${table} (rule) values ($1)`,
            [rule.rule], (err, result) => {
            });
        done();
        data = rule
        callback(data);
        return data
    });
}

let getRandomPubRule = (table, callback) => {
    let count;
    let random;
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`select * from ${table} order by 1`,
            (err, result) => {
                if (err) throw console.error(err);
                count = result.rows.length;
                random = Math.floor(Math.random() * count) + 1;
                client.query(`select * from ${table} where id = ${random} order by 1`,
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
    });
}

let deletePubRuleById = (table, id, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`delete from ${table} where id = ${id}`,
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

let getPubRuleById = (table, id, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`select * from ${table} where id = ${id} order by 1`,
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

let editPubRuleById = (table, newRule, id, callback) => {
    dbClient.connect((err, client, done) => {
        if (err) throw console.error(err);
        client.query(`update ${table} set rule = $1 where id = ${id}`, [newRule],
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

module.exports = { initDB, postUserToDB, validateUser, getUserData };