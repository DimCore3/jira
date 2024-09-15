const { checkAndCreateTables, addNote } = require('./sqlCommands');

let values = [
    'WIN-1023',
    'Встреча обсуждение вопросов пц',
    '2024-01-02 22:30:30',
    '2024-02-06 02:30:00'
];

checkAndCreateTables();
// addNote("jira_notes", values)