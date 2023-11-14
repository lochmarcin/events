import { NotFound } from "../exceptions/404.exeption";
import { BaseException } from "../exceptions/base.exceptions";
import { CustomRequest } from "../interfaces/customRequest.interface";

import EventUserRelation from "../migrations_ts/eventUserRelation.model"
import User from "../migrations_ts/user.model";

interface AttendeeId {
    id: number
}

interface BaseAttendee {
    user_id: number,
    event_id: number
}

interface CreateUpdateAt {
    updateAt: Date,
    createAt: Date
}

export type CreateAttendee = BaseAttendee

export type APIAttendee = AttendeeId & BaseAttendee

export type DBAttendee = AttendeeId & BaseAttendee & CreateAttendee



export const addEventUserAttendeesRecord = async (eventId: number, userId: number, req: CustomRequest): Promise<APIAttendee> => {
    try {
        const attendee = await EventUserRelation.create({
            user_id: userId,
            event_id: eventId
        })
        console.log(attendee.dataValues)
        return attendee

    } catch (error) {
        if (error.parent.code === '23505') {
            console.log(error.parent.detail)
            throw new BaseException(400, "You are already a participant of the event")
        }
        if (error.parent.code === '23503') {
            console.log(error.parent.detail)
            throw new NotFound(req.RequestId, "User or event not exist")
        }
        throw error
    }

}


export const getEventUserAttendeesRecords = async (eventId: number): Promise<APIAttendee[]> => {

    const attendees = await EventUserRelation.findAll({
        where: {
            event_id: eventId
        },
        attributes: [], //Attributes for EventUserRelation
        include: [{
            model: User,
            attributes: ['id', 'name', 'surname', 'email'],
            required: false
        }],
        raw: true
    })
    return attendees

}


export const deleteEventUserAttendeesRecord = async (eventId: number, userId: number): Promise<void> => {

    const attendees = await EventUserRelation.destroy({
        where: {
            event_id: eventId,
            user_id: userId
        }
    })
    if (attendees === 0) {
        throw new BaseException(404, "Attendee not found")
    }

}