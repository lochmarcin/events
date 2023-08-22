import jwt, { JwtPayload } from 'jsonwebtoken'
import { UserId, DBUser } from "../repositories/users.repository"
import { BaseException } from "../exceptions/base.exceptions"
import { Forbidden } from '../exceptions/forbidden.exception'


const createToken = async (userId: Partial<DBUser> ): Promise<string> => {
    console.log("User id from parametr: " + userId)
    const payload = {
        userId: userId
    }
    console.log("Payload: " + payload)

    try {
        const token = await jwt.sign(payload, process.env.SECRET, { expiresIn: '1d' })
        return token
    } catch (err) {
        console.log("createToken() " + err)
        throw new BaseException(500,`Internal Error`)
    }
}

const validateToken = async (token: string) => {
    try {
        const decoded = await jwt.verify(token, process.env.SECRET)
        console.log(decoded)
        return decoded
    } catch (err) {
        throw new Forbidden("Forbidden")
        // console.log("Error at veryfi jwt: " + err)
        // return null
    }

}

export {
    createToken,
    validateToken
}