import express, { Request, Response } from "express";

import { Forbidden } from '../exceptions/forbidden.exception'
import { BaseException } from '../exceptions/base.exceptions'
import { getAllUsersRecords, getOneUserInfoRecord, changeUserDataRecord, deleteUserRecord, APIUser } from '../repositories/users.repository'
import { validateToken } from "./jwt_service"
import { JwtPayload } from "jsonwebtoken";
import { JwtUserDB } from "../middelwares/token_validator";


const getAllUsers = async (): Promise<APIUser[]> => {
    return await getAllUsersRecords()
}

const getOneUser = async (userId: number): Promise<APIUser> => {
    return await getOneUserInfoRecord(userId)
}

const changeUserData = async (req: Request): Promise<APIUser> => {
    const id = Number(req.params.userId)
    const { name, surname } = req.body

    return await changeUserDataRecord(id, { name, surname })
}
const deleteUser = async (req: Request): Promise<void> => {
    if (req.headers.authorization) {
        const token = req.headers.authorization?.split(' ')[1]


        const loggedUser: JwtPayload = await validateToken(token) as JwtUserDB
        console.log("loggedUser")
        console.log(loggedUser)

        const userIdToDelete = Number(req.params.userId)
        if (loggedUser) {
            console.log(`${loggedUser.id} == ${userIdToDelete}`)
            if (loggedUser.id !== userIdToDelete) {
                throw new Forbidden("Tried to delete other user than youself")
            }
            else {
                return await deleteUserRecord(userIdToDelete)
            }
        }
    }

}


export {
    getAllUsers,
    getOneUser,
    changeUserData,
    deleteUser
}