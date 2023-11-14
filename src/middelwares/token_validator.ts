import express, { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken'


import { validateToken } from '../serices/jwt_service'
import { ReqNotValidated } from '../exceptions/reqNotValidated.exception'
import { DBUser } from "../repositories/users.repository";

import { CustomRequest } from "../interfaces/customRequest.interface"


// interface jwtDbUser {
//     id:number,
//     email: string,
//     name: string,
//     surname: string
//     iat: number,
//     exp: number
// }

export type JwtUserDB = DBUser & {
    iat: number,
    exp: number
}
// import { Request } from "express"
// export interface CustomRequest extends Request {
//     reqUserId?: number 
//     // token?: JwtUserDB  
// }

// interface JwtPayload {
//     id: number
// }

const tokenValidator = async (req: CustomRequest, res: Response, next: NextFunction):Promise<void> => {
    try {
        const token = req.headers.authorization?.split(' ')[1]
        if (!token) {
            throw new ReqNotValidated(req.RequestId)
        }
        const decoded = await validateToken(token) as JwtUserDB
        if (token && decoded) {
            console.log(decoded)
            console.log("User validated !")
            console.log(decoded.id)

            req.reqUserId = decoded.id
            return next()
        }
        else {
            throw new ReqNotValidated(req.RequestId)
        }
    } catch (error) {
        res.status(error.code || 401).send(error.returnMessage || "Unauthorized")
    }
}

export { tokenValidator }