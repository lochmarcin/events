import { BaseException } from "./base.exceptions"
import { logger } from "../middelwares/loggerEW.middleware"


class Unauthorized extends BaseException {
    constructor(reqId?: string, message?: string) {
        super(401, message? message :`Unauthorized`)
        logger.warn({ message: message? message :`Unauthorized`, code: 401, request_ID: reqId })
    }
}


export {
    Unauthorized
}