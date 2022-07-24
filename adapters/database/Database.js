import { Low, JSONFile } from 'lowdb'
import { LogLevel } from '../logger/LogLevel.js';

/**
 * @author Óscar Font
 * ====================
 * DatabaseAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the database details.
 * This class works as a wrapper of the database library.
 * Currently uses LowDB, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */

class DatabaseAdapter {
    #dbClient
    #logger

    constructor(logger) {
        this.#logger = logger;
        this.#dbClient = new Low(new JSONFile('./adapters/database/db.json'));
        this.#logger.log(DatabaseAdapter.name, LogLevel.INFO, 'LowDB client successfully started');
    }

    getDBClient() {
        return this.#dbClient;
    }

    async initDB() {
        try {
            const data = {
                user: [],
                post: []
            }
            this.#dbClient.data = data;
            await this.#dbClient.write();
            this.#logger.log(DatabaseAdapter.name, LogLevel.INFO, 'User and Post collections successfully created');
        } catch (e) {
            throw e
        }
    }

    getAllOf(table) {
        const data = this.#dbClient.data[table];
        if (!data) throw new Error('No data found in collection ' + table);
        return data;
    }

    findOf(table, condition) {
        const data = this.#dbClient.data[table].find(condition);
        if (!data) throw new Error('No data found in collection ' + table + ' for condition ' + condition);
        return data;
    }

    insertInto(table, obj) {
        this.#dbClient.data[table].push(obj);
    }

}

export default DatabaseAdapter;