import DatabaseAdapter from './adapters/database/Database.js';
import LoggerAdapter from './adapters/Logger.js';
import ServerAdapter from './adapters/Server.js';
import { LogLevel } from './utils/LogLevel.js';

const Main = async () => {
    const logger = new LoggerAdapter();
    const port = 3000;
    const server = new ServerAdapter(port, logger);
    const db = new DatabaseAdapter(logger);
    await db.initDB();
    server.start();
    logger.log(Main.name, LogLevel.INFO, 'Server sucessfully started at port ' + port);
};

Main();