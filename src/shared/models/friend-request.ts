import { User } from './user'

export class FriendRequest {
    id: string
    sender: User
    receiver: User

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
