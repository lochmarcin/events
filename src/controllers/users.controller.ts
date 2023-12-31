import express, { Request, Response, NextFunction } from "express";
// import router = express.Router()
// import router from '../router';
import { tokenValidator } from "../middelwares/token_validator"
import { getAllUsers, getOneUser, changeUserData, deleteUser } from "../serices/users.service"

const router = express.Router();

router.get("/", tokenValidator, async (req: Request, res: Response) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:userId", async (req: Request, res: Response) => {
    try {
        const user = await getOneUser(Number(req.params.userId))
        res.status(200).send(user)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.put("/:userId", tokenValidator, async (req: Request, res: Response) => {
    try {
        const user = await changeUserData(req)
        res.status(200).send(user)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.delete("/:userId", tokenValidator, async (req: Request, res: Response) => {
    try {
        const user = await deleteUser(req)
        res.sendStatus(204)
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
})

export default router 