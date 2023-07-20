import { createUserRecord, getUserRecord } from "../repositories/users.repository"
import bcrypt from "bcrypt"
import { createToken } from '../serices/jwt_service'
import { tokenValidator } from '../middelwares/token_validator'
import { InvalidCredentialsException } from "../exceptions/invalid.credentials.exception"

const createUser = async (req, res) => {
    const { email, password, name, surname } = req.body
    const hash = await bcrypt.hash(password, 10)

    const id = await createUserRecord(email, name, surname, hash, res)
    console.log("id usera otrzymane z bazy: " + id)
    const token = await createToken(id)
    return token
}

const validateUser = async (req, res) => {
    const { email, password } = req.body
    const user = await getUserRecord(email)

    if (!user || !await bcrypt.compare(password, user.password)) {
        // res.status(401).send("Email or password does not exist")
        throw new InvalidCredentialsException()
    }
    else {
        const token = await createToken(user.id)
        return token
    }
}

export {
    createUser,
    validateUser
}