import LoggerAdapter from './adapters/Logger.js';
import ServerAdapter from './adapters/Server.js';
import { LogLevel } from './utils/LogLevel.js';

const Main = () => {
    const logger = new LoggerAdapter();
    const server = new ServerAdapter(3000, logger);
    server.start();
    logger.log(Main.name, LogLevel.INFO, 'Server sucessfully started');
};

Main();