import { logger } from "../middelwares/loggerEW.middleware"

class BaseException extends Error {
    private code: Number
    private returnMessage
    constructor(code: Number, message: String) {
        super(`${code}: ${message}`)
        this.code = code
        this.returnMessage = message
        logger.error({ message: this.returnMessage, code: this.code })
    }

    getErrorDetails() {
        return {
            code: this.code,
            message: this.message
        }
    }
}
export { BaseException }