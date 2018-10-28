import { User } from './user'

export class Message {
    id?: string
    author?: User
    event: string
    in_response_to?: string
    edited?: boolean
    removed?: boolean
    body: string
    created?: Date


    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
