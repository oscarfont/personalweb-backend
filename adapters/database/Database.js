import { Low, JSONFile } from 'lowdb'
import { LogLevel } from '../logger/LogLevel.js';
import { v4 as uuidv4 } from 'uuid';

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
    }

    getDBClient() {
        return this.#dbClient;
    }

    async initDB() {
        try {
            const data = {
                user: [],
                blog: []
            }
            this.#dbClient.data = data;
            await this.#dbClient.write();
            this.#logger.log(DatabaseAdapter.name, LogLevel.INFO, 'User and Blog collections successfully created');
        } catch (e) {
            throw e
        }
    }

    async start() {
        try {
            await this.#dbClient.read();
            if (!this.#dbClient.data) await this.initDB();
            this.#logger.log(DatabaseAdapter.name, LogLevel.INFO, 'LowDB Client started successfully');
        } catch (e) {
            throw e;
        }
    }

    generateId() {
        return uuidv4();
    }

    getAllOf(table) {
        return this.#dbClient.data[table];
    }

    findOf(table, field) {
        const tableData = this.#dbClient.data[table];
        const name = Object.keys(field)[0];
        const data = tableData.filter((obj) => obj[name] === field[name]);
        if (!data) throw new Error('No data found in collection ' + table + ' for condition ' + field);
        return data;
    }

    async insertInto(table, obj) {
        try {
            // generate unique id before insert of data
            obj.id = this.generateId();
            const data = this.#dbClient.data[table];
            if (!data) {
                this.#dbClient.data[table] = [obj];
            } else {
                this.#dbClient.data[table].push(obj);
            }
            await this.#dbClient.write();
        } catch (e) {
            throw e;
        }
    }

    async removeElementByIdFrom(table, id) {
        try {
            const newData = this.#dbClient.data[table].filter(obj => obj.id !== id);
            this.#dbClient.data[table] = newData;
            await this.#dbClient.write();
        } catch (e) {
            throw e;
        }
    }

}

export default DatabaseAdapter;