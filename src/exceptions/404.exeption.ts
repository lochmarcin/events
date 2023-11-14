import { BaseException } from "./base.exceptions"
import { logger } from "../middelwares/loggerEW.middleware"


class NotFound extends BaseException {
    constructor(reqId?: string, message?: string) {
        super(404, message ? message : `Not Found`)
        logger.warn({ message: message ? message : `Not Found`, code: 401, request_ID: reqId })
    }
}


export {
    NotFound
}