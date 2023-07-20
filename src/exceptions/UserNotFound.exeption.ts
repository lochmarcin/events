import { BaseException } from "./base.exceptions"

class UserNotFound extends BaseException {
    constructor() {
        super(404, `User not found`)
    }
}


export {
    UserNotFound
}