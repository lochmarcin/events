import { BaseException } from "./base.exceptions"

class InvalidCredentialsException extends BaseException {
    constructor(){
        super(401, `Email or password is incorrect !`)
    }
}

export { InvalidCredentialsException}