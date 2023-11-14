import express from "express"
// import router = express.Router()
import { Request, Response, NextFunction } from "express";


import usermgmt from "./controllers/user-mgmt"
import usersControler from './controllers/users.controller'
import publishes from './controllers/publishers.controler'
import events from "./controllers/evevnts.controler"

const router = express.Router()

router.use("/user", usermgmt)
router.use("/users", usersControler)
router.use("/publishers", publishes)
router.use("/events", events)



export default router   