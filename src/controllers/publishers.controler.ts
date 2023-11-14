import express, { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { createPublisher, getAllPublishers, getOnePublisher, deletePublisher, updatePublisher, getAllEventsFromOnePublisher } from "../serices/publishers.service";
import { tokenValidator } from "../middelwares/token_validator";
import { triggerAsyncId } from "async_hooks";

const router = express.Router();

router.get("/", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        const publishers = await getAllPublishers()
        res.status(200).send(publishers)
    } catch (error) {
        console.log(error)
    }
})
router.get("/:publisherId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        // console.log("/:publisherId")
        const publisher = await getOnePublisher(Number(req.params.publisherId))
        res.status(200).send(publisher)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.post("/", tokenValidator, async (req: Request, res: Response) => {
    try {
        const id = await createPublisher(req)
        console.log(id)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
    // console.log(token)
})

router.delete("/:publisherId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        await deletePublisher(req, Number(req.params.publisherId))
        res.sendStatus(204)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.put("/:publisherId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        await updatePublisher(req, Number(req.params.publisherId))
        res.sendStatus(204)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.get("/:owner_id/events", tokenValidator, async ( req:CustomRequest, res: Response)=>{
    try {
        const publishers = await getAllEventsFromOnePublisher(req, Number(req.params.owner_id))
        res.status(200).send(publishers)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})



export default router