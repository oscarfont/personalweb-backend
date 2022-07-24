import pino from "pino";
import { LogLevel } from "./LogLevel.js";

/**
 * @author Óscar Font
 * ====================
 * LoggerAdapter class
 * ====================
 * @description
 * Adapter Pattern applied to the logger details.
 * This class works as a wrapper of the logging library.
 * Currently uses Pino, however if the library is wanted to be changed, 
 * the only file needed to modify is this adapter class and the code would still work.
 */
class LoggerAdapter {

    // logger property that contains the logger object
    #logger;
    outputPath;

    constructor() {
        const transport = pino.transport({
            target: 'pino-pretty',
            options: { colorize: true }
        });
        this.#logger = pino({}, transport);
        this.outputPath = '';
    }

    // getter
    get ouputpath() {
        return this.outputPath;
    }

    // setter
    set ouputpath(newPath) {
        this.outputPath = newPath;
    }

    // method to log the message
    log(path, level, message) {
        switch (level) {
            case LogLevel.INFO:
                this.#logger.info('[%s] - %s', path, message);
                break;
            case LogLevel.DEBUG:
                this.#logger.debug('[%s] - %s', path, message);
                break;
            case LogLevel.ERROR:
                this.#logger.error('[%s] - %s', path, message);
                break;
            case LogLevel.WARN:
                this.#logger.warn('[%s] - %s', path, message);
                break;
        }
    }
    // method to flush everything written in the logger
    flush() {
        this.#logger.flush();
    }
}

export default LoggerAdapter;