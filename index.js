import DatabaseAdapter from './adapters/database/Database.js';
import LoggerAdapter from './adapters/logger/Logger.js';
import ServerAdapter from './adapters/server/Server.js';
import { LogLevel } from './adapters/logger/LogLevel.js';
import JWTAdapter from './adapters/auth/JWTAdapter.js';
import CryptoAdapter from './adapters/auth/CryptoAdapter.js';

const Main = async () => {
    // init logger
    const logger = new LoggerAdapter();

    // init database
    const db = new DatabaseAdapter(logger);
    await db.start();

    // init auth adapter
    const jwtAdapter = new JWTAdapter(logger);
    const cryptoAdapter = new CryptoAdapter(logger);

    // init server
    const port = 3000;
    const server = new ServerAdapter(port, logger, db, jwtAdapter, cryptoAdapter);
    server.start();
    logger.log(Main.name, LogLevel.INFO, 'Server sucessfully started at port ' + port);
};

Main();