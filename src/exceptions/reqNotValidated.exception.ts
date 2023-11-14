import { BaseException } from "./base.exceptions"
import { logger } from "../middelwares/loggerEW.middleware"


class ReqNotValidated extends BaseException {
    constructor(reqId?: string) {
        super(401, `Not validated`)
        logger.warn({ message: `Not validated`, code: 401, request_ID: reqId })
    }
}


export {
    ReqNotValidated
}