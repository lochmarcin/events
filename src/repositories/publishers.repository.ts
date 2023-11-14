import { BaseException } from "../exceptions/base.exceptions"
import { Unauthorized } from "../exceptions/unauthorized.exeption"
import Publishers from "../migrations_ts/publishers.model"

interface BasePublisher {
    name: string
}

interface PublisherId {
    id: number
}

interface PublisherOwner {
    owner_id: number
}
interface CreateUpdateAt {
    updateAt: Date,
    createAt: Date
}

export type PublisherName = BasePublisher
export type CreatePublisher = BasePublisher & PublisherOwner
export type DBPublisher = BasePublisher & PublisherId & PublisherOwner & CreateUpdateAt
export type APIPublisher = BasePublisher & PublisherId & PublisherOwner

export const createPublisherRecord = async (newPublisher: CreatePublisher, reqID?: string): Promise<DBPublisher> => {
    try {
        const publisherData = await Publishers.create(newPublisher)
        // console.log(publisherData.dataValues)
        const publisher: DBPublisher = publisherData.dataValues

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

export const getAllPublishersRecords = async (): Promise<APIPublisher[]> => {
    const publishers = await Publishers.findAll({
        attributes: ["id",
            "owner_id",
            "name"]
    })
    if (!publishers) {
        throw new BaseException(404, 'Publishers not found')
    }
    else {
        return publishers
    }
}

export const getPublisherRecord = async (id: number, attributes: string[]): Promise<DBPublisher> => {
    const publisher = await Publishers.findOne({
        where: {
            id: id
        },
        attributes: attributes
    })
    if (!publisher) {
        throw new BaseException(404, 'Publisher not found')
    }
    else {
        return publisher
    }
}

export const deletePublisherRecord = async (publisherId: number): Promise<void> => {
    const publisher = await Publishers.destroy({
        where: {
            id: publisherId
        }
    })
    if (publisher === 0) {
        throw new BaseException(404, "Publisher not found")
    }
}

export const updatePublisherRecord = async (publisherId: number, name: string): Promise<void> => {
    const publisher = await Publishers.update({
        name: name
    }, {
        where: {
            id: publisherId
        },
        returning: true
    })
    // console.log(publisher[0])
    return publisher[0]
}

export const getPublisherList = async (owner_id: number): Promise<DBPublisher[]> => {
    const publisher = await Publishers.findAll({
        where: {
            owner_id: owner_id
        }
    })
    if (!publisher) {
        throw new BaseException(404, "Publishers not found")
    }
    else {
        return publisher
    }
}