import { logger } from "../middelwares/loggerEW.middleware"
import { BaseException } from "./base.exceptions"

class Forbidden extends BaseException {
    constructor(returnMessage?: string) {
        console.log("403 - FORBIDDEN !")
        super(403, returnMessage? returnMessage : "Forbidden" )
    }
}


export {
    Forbidden
}