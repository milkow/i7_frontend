import { RelationStatus } from '../enums'

export class User {
    id?: string
    username: string
    profile_picture_small: string
    profile_picture_medium: string
    profile_picture_normal: string
    relation_status: RelationStatus

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
