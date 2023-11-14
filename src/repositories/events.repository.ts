import { BaseException } from "../exceptions/base.exceptions";
import { Unauthorized } from "../exceptions/unauthorized.exeption";
import Events from "../migrations_ts/events.model";


interface BaseEvent {
    name: string
    description: string,
    start_date: Date,
    end_date: Date
}

interface EventId {
    id: number
}

interface EventOwnerPublisherId {
    publisher_id: number
}


interface CreateUpdateAt {
    updateAt: Date,
    createAt: Date
}

export type EventBase = BaseEvent

export type CreateEvent = BaseEvent & EventOwnerPublisherId

export type DBevent = BaseEvent & EventId & EventOwnerPublisherId & CreateUpdateAt

export type APIevent = BaseEvent & EventId & EventOwnerPublisherId


export const createEventRecord = async (newEvent: CreateEvent, reqID?: string): Promise<APIevent> => {
    try {
        const eventData = await Events.create(newEvent)
        console.log(eventData.dataValues)
        const publisher: DBevent = eventData.dataValues

        return publisher
    } catch (error) {
        if (error.parent.code === '23503') {
            throw new Unauthorized(reqID, error.parent.detail)
        }
        else {
            throw new BaseException(406, error)
        }
    }
}

export const getEventsRecordsFromOnePublisher = async (publisherId: number): Promise<APIevent[]> => {
    const events = await Events.findAll({
        where: {
            publisher_id: publisherId
        },
        attributes: ["id", "name", "description", "start_date", "end_date", "publisher_id"]
    })
    if (!events) {
        throw new BaseException(404, "Events from this publisher not found")
    }
    else {
        return events
    }
}


export const getAllEventsRecords = async (): Promise<APIevent[]> => {
    const events = await Events.findAll({
        attributes: ["id", "name", "description", "start_date", "end_date", "publisher_id"]
    })
    if (!events) {
        throw new BaseException(404, "Event not found")
    }
    else {
        // console.log(events)
        return events
    }
}

export const getOneEventRecord = async (eventId: number): Promise<APIevent> => {
    const event = await Events.findOne({
        where: {
            id: eventId
        },
        attributes: ["id", "name", "description", "start_date", "end_date", "publisher_id"]
    })
    if (!event) {
        throw new BaseException(404, "Event not found")
    }
    else {
        return event
    }
}


export const updateOneEventRecord = async (eventId: number, updates: EventBase): Promise<APIevent> => {
    let event = await Events.update({
        name: updates.name,
        description: updates.description,
        start_date: updates.start_date,
        end_date: updates.end_date
    },
        {
            where: {
                id: eventId
            },
            returning: true
        })
    if (!(event[0] === 1)) {
        throw new BaseException(404, "No event updated!")
    }
    else {
        event = event[1]
        return event[0]
    }
}

export const deleteEventRecord = async (eventId: number): Promise<void> => {
    const event = await Events.destroy({
        where: {
            id: eventId
        }
    })
    if (event === 0) {
        throw new BaseException(404, "Event not found")
    }
}


