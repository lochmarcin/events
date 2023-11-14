import { logger } from "../middelwares/loggerEW.middleware"
import { BaseException } from "./base.exceptions"

class InternatlServerError extends BaseException {
    constructor(reqId?: string) {
        super(500, "Internal Server Error")
        logger.error({ code: 500, message: "Internal Server Error" })
    }
}


export {
    InternatlServerError
}