// const User = require('../helpers/models/users')
import { User } from '../migrations_ts/user.model'
import { UserAlreadyExist } from '../exceptions/userAlreadyExist.exception'
import { UserNotFound } from '../exceptions/UserNotFound.exeption'

const createUserRecord = async (email: string, name: string, surname: string, password: string) => {
    try {
        const user = await User.create({ email, password, name, surname })
        return user.id
    } catch (error: any) {
        if (error.parent.code === '23505') {
            // console.log(res.locals.logger)
            console.log('23505')

            throw new UserAlreadyExist()
        }
    }
}

const getUserRecord = async (email: string) => {

    try {
        const user = await User.findOne({ where: { email: email } })
        console.log(user)

        return user
    } catch (error) {
        console.log(error)
    }
}

const getAllUsersRecords = async () => {
    try {
        const users = await User.findAll({
            attributes: ["id",
                "email",
                "name",
                "surname"]
        })
        return users
    } catch (error) {
        console.log(error)
    }
}

const getOneUserInfoRecord = async (userId: number) => {
    const user = await User.findOne({
        where: {
            id: userId
        },
        raw: true
    })
    if (!user)
        throw new UserNotFound()
    else
        return user
}

const changeUserDataRecord = async (userId: number, name: string, surname: string) => {
    // console.log(name, surname)
    interface Changes {
        name?:string,
        surname?:string
    }
    const changes: Changes = {}
    
    if (name) changes.name = name
    if (surname) changes.surname = surname
    console.log(changes)

    const user = await User.update(changes, {
        where: {
            "id": userId
        },
        returning: true
    })
    // console.log(user[1])
    let newUser = user[1][0]
    if (!newUser) {
        throw new UserNotFound()
    }
    else {
        return newUser
    }
}

const deleteUserRecord = async (userId: number) => {
    const user = await User.destroy({
        where: {
            id: userId
        }
    })
    if (user === 0) {
        throw new UserNotFound()
    }

}

export {
    createUserRecord,
    getUserRecord,
    getAllUsersRecords,
    getOneUserInfoRecord,
    changeUserDataRecord,
    deleteUserRecord
}