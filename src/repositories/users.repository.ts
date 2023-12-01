// const User = require('../helpers/models/users')
import User from '../migrations_ts/user.model'
import { UserAlreadyExist } from '../exceptions/userAlreadyExist.exception'
import { UserNotFound } from '../exceptions/UserNotFound.exeption'
import { Forbidden } from '../exceptions/forbidden.exception'
import { client } from '../helpers/redis.connection.helper'
import { BaseException } from '../exceptions/base.exceptions'
import { Console } from 'console'





interface BaseUser {
    email: string,
    name: string,
    surname: string
}

interface UserId {
    id: number
}

interface UserPassword {
    password: string
}

export type CreateUser = BaseUser & UserPassword
export type DBUser = BaseUser & UserId & UserPassword
export type APIUser = BaseUser & UserId


const cacheUsers = async ():Promise<void> => {
    const users = await User.findAll()
    client.set('users', JSON.stringify(users))
} 

const cacheUsersData = async (users:APIUser[]):Promise<void> => {
    client.set('users', JSON.stringify(users))
} 

// const getCacheUsers = async ():Promise<APIUser[]> =>{
//     const users = await client.get('users')
//     if(!users){
//         console.log("no users in cache!")
//         throw new BaseException(500, "no users in cache!")
//     }
//     console.log("Cache Hit - Users from cache!")
//     return JSON.parse(users)
// }
const getCacheUsers = async () =>{
    const users = await client.get('users')  
    return users? JSON.parse(users) : null
}

const createUserRecord = async (newUser: CreateUser): Promise<UserId> => {
    // const createUserRecord = async(newUser.email: string, name: string, surname: string, password: string) => {
    client.del('users')
    try {
        const user = await User.create(newUser)
        console.log(user)
        // cacheUsers()
        return user.id
    } catch (error) {
        if (error.parent.code === '23505') {
            // console.log(res.locals.logger)
            console.log('23505')

            throw new UserAlreadyExist()
        }
        else {
            throw new Forbidden('Forbidden')
        }
    }
}

const getUserRecord = async (email: string): Promise<DBUser> => {

    try {
        const user = await User.findOne({
            where: {
                email: email
            },
            raw: true,
            attributes: [
                "id",
                "email",
                "name",
                "surname",
                "password"
            ]
        })
        console.log(user)
        return user
    } catch (error) {
        console.log(error)
        throw new UserNotFound()
    }
}

const getAllUsersRecords = async (): Promise<APIUser[]> => {

    const usersFromCache = await getCacheUsers()
    if(usersFromCache){
        console.log("Cache Hit - Users from cache!")
        return usersFromCache
    }

    const users = await User.findAll({
        attributes: ["id",
            "email",
            "name",
            "surname"]
    })
    if (!users)
        throw new UserNotFound()
    else{
        cacheUsersData(users)
        return users
    }

}

const getOneUserInfoRecord = async (userId: number): Promise<APIUser> => {
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

const changeUserDataRecord = async (userId: number, changeUser: Partial<BaseUser>) :Promise<APIUser> => {

    console.log(changeUser)
    console.log(userId)

    const user = await User.update(changeUser, {
        where: {
            "id": userId
        },
        returning: true
    })
    console.log(user[1])
    let newUser = user[1][0]
    if (!newUser) {
        throw new UserNotFound()
    }
    else {
        return newUser
    }
}

// const changeUserDataRecord = async (userId: number, name: string, surname: string) => {
//     // console.log(name, surname)
//     interface Changes {
//         name?: string,
//         surname?: string
//     }
//     const changes: Changes = {}

//     if (name) changes.name = name
//     if (surname) changes.surname = surname
//     console.log(changes)

//     const user = await User.update(changes, {
//         where: {
//             "id": userId
//         },
//         returning: true
//     })
//     // console.log(user[1])
//     let newUser = user[1][0]
//     if (!newUser) {
//         throw new UserNotFound()
//     }
//     else {
//         return newUser
//     }
// }

const deleteUserRecord = async (userId: number): Promise<void> => {
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
    deleteUserRecord,
    UserId
}