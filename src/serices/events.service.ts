import express, { Response } from "express";
import { CustomRequest } from "../interfaces/customRequest.interface"
import { APIevent, createEventRecord, deleteEventRecord, getAllEventsRecords, getOneEventRecord, updateOneEventRecord } from "../repositories/events.repository";
import { Forbidden } from "../exceptions/forbidden.exception";
import { getPublisherRecord } from "../repositories/publishers.repository";
import { APIAttendee, addEventUserAttendeesRecord, deleteEventUserAttendeesRecord, getEventUserAttendeesRecords } from "../repositories/attendees.repository";

const checkYouChangeWhatYouDid = async (req: CustomRequest, eventId: number): Promise<void> => {
    const event = await getOneEventRecord(eventId)

    const publisher = await getPublisherRecord(event.publisher_id, ["id", "owner_id"])
    // console.log(publisher)
    if (!(publisher.owner_id === req.reqUserId)) {
        throw new Forbidden()
    }

}


export const createEvent = async (req: CustomRequest): Promise<APIevent> => {
    const { name, description, start_date, end_date, publisher_id } = req.body

    const publisher = await getPublisherRecord(publisher_id, ["owner_id"])

    if (publisher.owner_id !== req.reqUserId) {
        throw new Forbidden()
    }
    else {
        const event = await createEventRecord({ name, description, start_date, end_date, publisher_id }, req.RequestId)

        console.log("event otrzymany z bazy: " + event)
        return event
    }
}

export const getAllEvents = async (): Promise<APIevent[]> => {
    return await getAllEventsRecords()
}

export const getOneEvent = async (req: CustomRequest, eventId: number): Promise<APIevent> => {
    return await getOneEventRecord(eventId)
}

export const uptadeOneEvent = async (req: CustomRequest, eventId: number): Promise<APIevent> => {
    await checkYouChangeWhatYouDid(req, eventId)

    const { name, description, start_date, end_date } = req.body
    return await updateOneEventRecord(eventId, { name, description, start_date, end_date })
}

export const deleteOneEvent = async (req: CustomRequest, eventId: number): Promise<void> => {
    await checkYouChangeWhatYouDid(req, eventId)
    await deleteEventRecord(eventId)
}


export const addEventUserAttendees = async (req: CustomRequest, eventId: number): Promise<APIAttendee> => {
    if (!req.reqUserId)
        throw new Forbidden()
    return await addEventUserAttendeesRecord(eventId, req.reqUserId, req)
}

export const getEventUserAttendees = async (eventId: number): Promise<APIAttendee[]> => {
    return await getEventUserAttendeesRecords(eventId)
}

export const deleteEventUserAttendee = async (req:CustomRequest, eventId: number, userId:number): Promise<void> => {
    if(!(Number(req.reqUserId) === userId)) {
        console.log(Number(req.reqUserId) ,userId)
        console.log((Number(req.reqUserId) === userId))
        throw new Forbidden()
    }
    await deleteEventUserAttendeesRecord(eventId, userId)
}