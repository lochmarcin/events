import express, { Request, Response } from "express";

import { Forbidden } from '../exceptions/forbidden.exception'
import { BaseException } from '../exceptions/base.exceptions'
import { getAllUsersRecords, getOneUserInfoRecord, changeUserDataRecord, deleteUserRecord } from '../repositories/users.repository'
import { validateToken } from "./jwt_service"
import { JwtPayload } from "jsonwebtoken";


const getAllUsers = async () => {
    return await getAllUsersRecords()
}

const getOneUser = async (userId: number) => {
    return await getOneUserInfoRecord(userId)
}

const changeUserData = async (req: Request) => {
    const userId = Number(req.params.userId)
    const { name, surname } = req.body

    return await changeUserDataRecord(userId, name, surname)
}
const deleteUser = async (req: Request) => {
    if (req.headers.authorization) {
        const token = req.headers.authorization?.split(' ')[1]


        const loggedUser: JwtPayload = await validateToken(token) as Object

        const userIdToDelete = Number(req.params.userId)
        if (loggedUser) {
            if (loggedUser.userId !== userIdToDelete) {
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