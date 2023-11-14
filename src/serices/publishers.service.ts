import express, { Response } from "express";
import { CustomRequest } from "../interfaces/customRequest.interface"
import { APIPublisher, CreatePublisher, DBPublisher, PublisherName, createPublisherRecord, getAllPublishersRecords, getPublisherRecord, deletePublisherRecord, updatePublisherRecord, getPublisherList } from "../repositories/publishers.repository";
import { InternatlServerError } from "../exceptions/500.exeption"
import { ReqNotValidated } from "../exceptions/reqNotValidated.exception";
import { Forbidden } from "../exceptions/forbidden.exception";
import { Unauthorized } from "../exceptions/unauthorized.exeption";
import { APIevent, getEventsRecordsFromOnePublisher } from "../repositories/events.repository";


const checkYouChangeWhatYouDid = async (req: CustomRequest, publisherId: number): Promise<void> => {
    const publisher = await getPublisherRecord(publisherId, ["id", "owner_id"])
    if (!(publisher.owner_id === req.reqUserId)) {
        throw new Forbidden()
    }
}


export const createPublisher = async (req: CustomRequest): Promise<number> => {
    const { name } = req.body
    if (!req.reqUserId) {
        throw new Forbidden()
    }
    else {
        const publisher = await createPublisherRecord({ name, owner_id: req.reqUserId })

        // const publisher = await createPublisherRecord({ name, owner_id: 100 }, req.RequestId)

        console.log("id Publishera otrzymane z bazy: " + publisher?.id)
        return publisher.id

    }

}

export const getAllPublishers = async (): Promise<APIPublisher[]> => {
    return await getAllPublishersRecords()
}

export const getOnePublisher = async (publisherId: number): Promise<PublisherName> => {
    const publisher = await getPublisherRecord(publisherId, ["name"])
    return publisher
}

export const deletePublisher = async (req: CustomRequest, publisherId: number): Promise<void> => {
    await checkYouChangeWhatYouDid(req, publisherId)

    await deletePublisherRecord(publisherId)


}

export const updatePublisher = async (req: CustomRequest, publisherId: number): Promise<void> => {
    await checkYouChangeWhatYouDid(req, publisherId)

    return await updatePublisherRecord(publisherId, req.body.name)

}

export const getAllEventsFromOnePublisher = async (req: CustomRequest, publisherId: number): Promise<APIevent[]> => {

    await checkYouChangeWhatYouDid(req, publisherId)

    return await getEventsRecordsFromOnePublisher(publisherId)

    // return await getPublisherList(owner_id)
}

