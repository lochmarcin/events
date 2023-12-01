import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserId, DBUser } from "../repositories/users.repository"
import { BaseException } from "../exceptions/base.exceptions"
import { Forbidden } from '../exceptions/forbidden.exception'
import { JwtUserDB } from '../middelwares/token_validator'

// interface jwtDbUser {
//     iat: Date,
//     exp: Date
// }

// type JwtUserDB = DBUser & jwtDbUser

const createToken = async (userId: Partial<DBUser>): Promise<string> => {
    console.log("User id from parametr: " + userId)
    console.log(userId)

    try {
        if (!process.env.SECRET) {
            throw new Forbidden()
        }
        else {
            const token = jwt.sign(userId, process.env.SECRET, { expiresIn: 60 * 60 })
            return token
        }
    } catch (err) {
        console.log("createToken() " + err)
        throw new BaseException(500, `Internal Error`)
    }
}

const validateToken = async (token: string): Promise<JwtUserDB> => {
    try {
        if (!process.env.SECRET) {
            throw new Forbidden()
        }
        else {
            const decoded = await jwt.verify(token, process.env.SECRET) as JwtUserDB
            return decoded
        }
    } catch (err) {
        throw new Forbidden("Forbidden")
    }

}

export {
    createToken,
    validateToken
}