const sqlite3 = require('sqlite3').verbose();
const path = require('path')

const createDb = () => {
    db = new sqlite3.Database('./db/yoot.sqlite3', createTable);
}

const readDb = () => {
    const dbPath = path.resolve(__dirname, './db/yoot.sqlite3')
    const e = new sqlite3.Database(dbPath);
    return e;
}


function createTable() {
    console.log("createTable lorem");
    db.run("CREATE TABLE IF NOT EXISTS log (info TEXT)");
}

const insertRows = (db, value) => new Promise((resolve, reject) => {
    db.run("INSERT INTO log(concurrency, success, fail, timeout, run_time) SELECT ?, ?, ?, ?, ?",

        value, (err) => {

            if (err) {
                reject(err.message);
            }
            resolve(this.lastID);

        });
})

function readAllRows() {
    console.log("readAllRows lorem");
    db.all("SELECT rowid AS id, info FROM lorem", function (err, rows) {
        rows.forEach(function (row) {
            console.log(row.id + ": " + row.info);
        });
        closeDb();
    });
}

function closeDb() {
    console.log("closeDb");
    db.close();
}

function runChainExample() {
    createDb();
}

const insertLog = (value) => {
    const db = readDb();
    insertRows(db, value);

    db.close();
}


exports.insertLog = insertLog;
