import { LogLevel } from '../logger/LogLevel.js';
import { v4 as uuidv4 } from 'uuid';

/**
 * @author Óscar Font
 * ====================
 * MockDb class
 * ====================
 * @description
 * 
 * This class is an adapter that simulates the LowDB database
 * Adapter. It serves as a mock. The property data contains
 * all the data that would be stored in the db.json file
 * that the LowDB would read and store the data.
 * 
 */

class MockDb {
    #data
    #logger

    constructor(logger) {
        this.#logger = logger;
    }

    initDB() {
        this.#data = {
            user: [
                {
                    "email": "test.test@testmail.com",
                    "name": "Test",
                    "role": "admin",
                    "password": {
                        "iv": "ml+p9MV0w2/E9H3Y",
                        "data": "FfF71xUo6mE="
                    },
                    "id": "cd296770-4980-4bb7-8743-245043845cb0"
                }
            ],
            blog: []
        }
        this.#logger.log(MockDb.name, LogLevel.DEBUG, 'User and Blog collections successfully created');
    }

    start() {
        if (!this.#data) this.initDB();
        this.#logger.log(MockDb.name, LogLevel.DEBUG, 'MockDb Client started successfully');
    }

    generateId() {
        return uuidv4();
    }

    getAllOf(table) {
        return this.#data[table];
    }

    findOf(table, field) {
        const tableData = this.#data[table];
        const name = Object.keys(field)[0];
        const data = tableData.filter((obj) => obj[name] === field[name]);
        if (!data) throw new Error('No data found in collection ' + table + ' for condition ' + field);
        return data;
    }

    async insertInto(table, obj) {
        // generate unique id before insert of data
        obj.id = this.generateId();
        const data = this.#data[table];
        if (!data) {
            this.#data[table] = [obj];
        } else {
            this.#data[table].push(obj);
        }
    }

    async removeElementByIdFrom(table, id) {
        const newData = this.#data[table].filter(obj => obj.id !== id);
        this.#data[table] = newData;
    }

}

export default MockDb;