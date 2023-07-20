import { Forbidden } from '../exceptions/forbidden.exception'
import { BaseException } from '../exceptions/base.exceptions'
import { getAllUsersRecords, getOneUserInfoRecord, changeUserDataRecord, deleteUserRecord } from '../repositories/users.repository'
import { validateToken } from "./jwt_service"


const getAllUsers = async () => {
    return await getAllUsersRecords()
}

const getOneUser = async (userId) => {
    return await getOneUserInfoRecord(userId)
}

const changeUserData = async (req) => {
    const userId = req.params.userId
    const { name, surname } = req.body

    return await changeUserDataRecord(userId, name, surname)
}
const deleteUser = async (req) => {
    const loggedUser = await validateToken(req.headers.authorization.split(' ')[1])
    const userIdToDelete = Number(req.params.userId)
    if (loggedUser.userId !== userIdToDelete) {
        throw new Forbidden("Tried to delete other user than youself")
    }
    else {
        return await deleteUserRecord(userIdToDelete)
    }
}


export {
    getAllUsers,
    getOneUser,
    changeUserData,
    deleteUser
}