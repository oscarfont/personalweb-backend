import pino from "pino";
import { LogLevel } from "../utils/LogLevel.js";

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