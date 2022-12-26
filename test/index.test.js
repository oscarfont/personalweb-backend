import LoggerAdapter from '../adapters/logger/Logger.js';
import ServerAdapter from '../adapters/server/Server.js';
import { LogLevel } from '../adapters/logger/LogLevel.js';
import JWTAdapter from '../adapters/auth/JWTAdapter.js';
import CryptoAdapter from '../adapters/auth/CryptoAdapter.js';

describe("Test the server", () => {
    test("The server shall start correctly at port 3000", async () => {
        // init logger
        const logger = new LoggerAdapter();

        // init database
        //const db = new DatabaseAdapter(logger);
        //await db.start();

        // init auth adapter
        const jwtAdapter = new JWTAdapter(logger);
        const cryptoAdapter = new CryptoAdapter(logger);

        // init server
        const port = 3000;
        const server = new ServerAdapter(port, logger, undefined, jwtAdapter, cryptoAdapter);
        server.start();
        //logger.log('Server test:', LogLevel.INFO, 'Server sucessfully started at port ' + port);
        expect(server.port).toBe(port);
    });
});