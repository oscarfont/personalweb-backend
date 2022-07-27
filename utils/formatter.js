/**
 * @author Óscar Font
 * =========================
 * Formatter Singleton class
 * =========================
 * @description 
 * The Signleton pattern has been applied for this class.
 * This means there will only be one instance of it for the whole code.
 * This class has the main responsibility of formatting the server responses.
 */

class Formatter {
    serverName;
    version;
    statusCode;
    status;
    error;
    data;

    constructor(serverName, version) {
        this.serverName = serverName;
        this.version = version;
    }

    formatOKResponse(statusCode, data) {
        this.data = data;
        this.statusCode = statusCode;

        return { server: this.serverName, version: this.version, statusCode: this.statusCode, status: 'success', data: this.data }
    }

    formatErrorResponse(statusCode, data) {
        this.data = data;
        this.statusCode = statusCode;

        return { server: this.serverName, version: this.version, statusCode: this.statusCode, status: 'error', message: this.data }
    }
}

const formatter = new Formatter('Personalweb-backend', '0.0.1');
export { formatter }