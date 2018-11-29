import { User } from './user'

export class Message {
    id?: string
    author?: User
    i7event: string
    in_response_to?: string
    edited?: boolean
    removed?: boolean
    body: string
    created?: Date
    likes: number
    replyClicked?: boolean
    my_like: boolean
    replies_count: number

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
