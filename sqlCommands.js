const connection = require('./db');
const tables = require('./tables')

function checkAndCreateTables() {
    tables.forEach(e => {
        checkIfTableExists(e.name, e.rows);
    });
}

function checkIfTableExists(name, rows) {
    const query = `SHOW TABLES LIKE '${name}'`;

    connection.query(query, (error, results) => {
        if (error) {
            console.error('Ошибка при выполнении запроса: ',error);
            return;
        }

        if (results.length > 0) {
            console.log(`Таблица ${name} существует`);
        } else {
            console.log(`Таблица ${name} не существует`);
            createTable(name, rows);
        }
    });
}

function createTable(name, rows) {
    let rowsToTableQuery = 'id INT AUTO_INCREMENT PRIMARY KEY,\n';

    rows.forEach((e, i) => {
        rowsToTableQuery = rowsToTableQuery + `${e.name} ${e.type} ${e.importance} ${rows.length - 1 == i ? '' : ',\n'}`
    });

    const createTableQuery = `
        CREATE TABLE ${name} (
            ${rowsToTableQuery}
        )
    `;

    connection.query(createTableQuery, (err, result) => {
        if (err) throw err;
        console.log(`Таблица ${name} создана`);
    });
}

function addNote(tableName, values) {
    for (let i = 0; i < tables.length; i++) {
        const table = tables[i];
        if (table.name == tableName) {
            insertInto(table, values);
        }
    }
}

function insertInto(table, values) {
    let rowNames = '';
    let preparedStatements = '';

    table.rows.forEach((e, i) => {
        rowNames = rowNames + (table.rows.length - 1 != i ? e.name + ', ' : e.name);
        preparedStatements = preparedStatements + (table.rows.length - 1 != i ? '?, ' : '?')
    });

    const insertIntoQuery = `
INSERT INTO ${table.name} (${rowNames})
VALUES (${preparedStatements})
    `

    connection.query(insertIntoQuery, values, (err, result) => {
        if (err) throw err;
        console.log('Данные добавлены, ID: ' + result.insertId);
    });
}

module.exports = {
    checkAndCreateTables,
    addNote
  };
