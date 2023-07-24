import express from "express"
// import router = express.Router()
import { router } from '../router';
import { tokenValidator } from "../middelwares/token_validator"
import { getAllUsers, getOneUser, changeUserData, deleteUser } from "../serices/users.service"

router.get("/", tokenValidator, async (req, res) => {
    try {
        const users = await getAllUsers()
        res.status(200).json(users)
    } catch (error) {
        console.log(error)
    }
})

router.get("/:userId", async (req, res) => {
    try {
        const user = await getOneUser(Number(req.params.userId))
        res.status(200).send(user)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.put("/:userId", tokenValidator, async (req, res) => {
    try {
        const user = await changeUserData(req)
        res.status(200).send(user)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.delete("/:userId", tokenValidator, async (req, res) => {
    try {
        const user = await deleteUser(req)
        res.status(204).send("User properly deleted")
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
})

export default router 