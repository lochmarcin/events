// import express from "express"
// import router  from express.Router()
import express, { Request, Response, NextFunction } from "express";

// import router from './../router';
import { createUser, validateUser } from "../serices/user.service"
import { tokenValidator } from "../middelwares/token_validator"
import { CustomRequest } from "../interfaces/customRequest.interface"
import { DBUser } from "../repositories/users.repository";
// import { JwtPayload } from "jsonwebtoken";

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const UserId = await createUser(req, res)
        // await createUser(req, res)
        res.status(201).send(UserId.toString())

    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
    // console.log(token)
})


router.post("/validate", tokenValidator, (req: CustomRequest, res: Response) => {
    const user = req.reqUserId
    console.log(user)
    res.sendStatus(204)
})

router.post("/login", async (req: Request, res: Response) => {
    try {
        const token = await validateUser(req, res)
        res.send(token)
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
    // console.log(token)
})

export default router 