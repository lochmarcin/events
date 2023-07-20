import { logger } from "../middelwares/loggerEW.middleware"
import { BaseException } from "./base.exceptions"

class Forbidden extends BaseException {
    constructor(returnMessage) {
        super(403, returnMessage)
    }
}


export {
    Forbidden
}