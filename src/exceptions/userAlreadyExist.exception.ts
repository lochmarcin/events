import { BaseException } from "./base.exceptions"

class UserAlreadyExist extends BaseException {
    constructor() {
        super(409, `Email already exist`)
    }
}


export {
    UserAlreadyExist
}