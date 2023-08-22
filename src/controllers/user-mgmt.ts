// import express from "express"
// import router  from express.Router()
import express, { Request, Response, NextFunction } from "express";

// import router from './../router';
import { createUser, validateUser } from "../serices/user.service"
import { tokenValidator } from "../middelwares/token_validator"

const router = express.Router();

router.post("/register", async (req: Request, res: Response) => {
    try {
        const token = await createUser(req, res)
        res.status(200).send(token)
        console.log(token)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
    // console.log(token)
})


router.post("/validate", tokenValidator, (req: Request, res: Response) => {

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