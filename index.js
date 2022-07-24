import DatabaseAdapter from './adapters/database/Database.js';
import LoggerAdapter from './adapters/logger/Logger.js';
import ServerAdapter from './adapters/server/Server.js';
import { LogLevel } from './adapters/logger/LogLevel.js';

const Main = async () => {
    // init logger
    const logger = new LoggerAdapter();

    // init database
    const db = new DatabaseAdapter(logger);
    if (!db.getDBClient().data) await db.initDB();

    // init server
    const port = 3000;
    const server = new ServerAdapter(port, logger, db);
    server.start();
    logger.log(Main.name, LogLevel.INFO, 'Server sucessfully started at port ' + port);
};

Main();