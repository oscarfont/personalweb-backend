import DatabaseAdapter from './adapters/database/Database.js';
import LoggerAdapter from './adapters/logger/Logger.js';
import ServerAdapter from './adapters/server/Server.js';
import { LogLevel } from './adapters/logger/LogLevel.js';

const Main = async () => {
    const logger = new LoggerAdapter();
    const port = 3000;
    const db = new DatabaseAdapter(logger);
    await db.initDB();
    const server = new ServerAdapter(port, logger, db);
    server.start();
    logger.log(Main.name, LogLevel.INFO, 'Server sucessfully started at port ' + port);
};

Main();