import express from "express"
// import router = express.Router()
import { Request, Response, NextFunction } from "express";


import usermgmt from "./controllers/user-mgmt"
import usersControler from './controllers/users.controller'

const router = express.Router()

router.use("/user", usermgmt)
router.use("/users", usersControler)


export default router   