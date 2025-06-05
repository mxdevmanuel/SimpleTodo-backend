const parse = require("pg-connection-string").parse;

require('dotenv').config();

const isProduction = process.env.NODE_ENV === 'production';
let connectionConfig = {};
if(isProduction){
	connectionConfig = parse(process.env.DATABASE_URL);
	connectionConfig.ssl = {
		require: true,
		rejectUnauthorized: false,
	};
}
const knexConfig = isProduction
  ? {
      client: 'pg',
      connection: connectionConfig,
      pool: { min: 1, max: 1 },
    }
  : {
      client: 'better-sqlite3',
      connection: { filename: './db.sqlite' },
      useNullAsDefault: true,
    };

const db = require('knex')(knexConfig);

// Initialize the database and create tables if they don't exist
db.schema.hasTable('project').then(exists => {
	if (!exists) {
		return db.schema.createTable('project', table => {
			table.increments('id').primary();
			table.string('name').notNullable();
		});
	}
});
db.schema.hasTable('task').then(exists => {
	if (!exists) {
		return db.schema.createTable('task', table => {
			table.increments('id').primary();
			table.string('title').notNullable();
			table.text('description');
			table.integer('project').unsigned().references('id').inTable('project');
			table.boolean('completed').defaultTo(false);
			table.boolean('archived').defaultTo(false);
            table.index('id', 'task_id_index');
            table.index('project', 'task_project_index');
		});
	}
});

db.schema.hasTable('todo').then(exists => {
	if (!exists) {
		return db.schema.createTable('todo', table => {
			table.increments('id').primary();
			table.string('title').notNullable();
			table.boolean('completed').defaultTo(false);
			table.integer('task').unsigned().references('id').inTable('task');
            table.index('id', 'todo_id_index');
            table.index('task', 'todo_task_index');
		});
	}
}
);

module.exports = db;