import express, { Request, Response, NextFunction } from "express";
import { CustomRequest } from "../interfaces/customRequest.interface";
import { tokenValidator } from "../middelwares/token_validator";
import { addEventUserAttendees, createEvent, deleteEventUserAttendee, deleteOneEvent, getAllEvents, getEventUserAttendees, getOneEvent, uptadeOneEvent } from "../serices/events.service";


const router = express.Router();


router.post("/", tokenValidator, async (req: Request, res: Response) => {
    try {
        const id = await createEvent(req)
        console.log(id)
        res.sendStatus(201)
    } catch (error) {
        console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
    // console.log(token)
})

router.get("/", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        const events = await getAllEvents()
        // console.log(events)
        res.status(200).json(events)
    } catch (error) {
        // console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
})

router.get("/:eventId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        const event = await getOneEvent(req, Number(req.params.eventId))
        res.status(200).json(event)
    } catch (error) {
        // console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
})

router.put("/:eventId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        const event = await uptadeOneEvent(req, Number(req.params.eventId))
        res.status(200).json(event)
    } catch (error) {
        // console.log(error)
        res.status(error.code).send(error.returnMessage)
    }
})

router.delete("/:eventId", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        await deleteOneEvent(req, Number(req.params.eventId))
        res.sendStatus(204)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})


router.post("/:eventId/attendees", tokenValidator, async (req: CustomRequest, res: Response) => {
    try {
        const attendee = await addEventUserAttendees(req, Number(req.params.eventId))
        res.status(200).send(attendee)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.get("/:eventId/attendees", async (req: CustomRequest, res: Response) => {
    try {
        const attendees = await getEventUserAttendees(Number(req.params.eventId))
        res.status(200).send(attendees)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

router.delete("/:eventId/attendes/:userId", tokenValidator, async (req: CustomRequest, res: Response)=>{

    try {
        const attendees = await deleteEventUserAttendee(req, Number(req.params.eventId), Number(req.params.userId))
        res.sendStatus(204)
    } catch (error) {
        res.status(error.code).send(error.returnMessage)
    }
})

export default router
