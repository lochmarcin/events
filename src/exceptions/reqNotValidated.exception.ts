import { BaseException } from "./base.exceptions"

class ReqNotValidated extends BaseException {
    constructor() {
        super(401,`Not validated`)        
    }
}


export {
    ReqNotValidated
}