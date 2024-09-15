const tables = [
    {
        name: 'jira_notes',
        rows: [
            {
                name: 'task_id',
                type: 'VARCHAR(10)',
                importance: ''
            },
            {
                name: 'comment',
                type: 'VARCHAR(100)',
                importance: 'NOT NULL'
            },
            {
                name: 'jira_note_date',
                type: 'DATETIME',
                importance: 'NOT NULL'
            },
            {
                name: 'date_row',
                type: 'DATETIME',
                importance: 'NOT NULL'
            }
        ]
    }
];

module.exports = tables;