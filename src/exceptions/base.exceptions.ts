import { logger } from "../middelwares/loggerEW.middleware"

class BaseException extends Error {
    private code: number
    private returnMessage: string
    constructor(code: number, message: string) {
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