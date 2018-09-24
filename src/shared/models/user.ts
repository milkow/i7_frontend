export class User {
    id?: string
    username: string
    profile_picture_small: string
    profile_picture_medium: string
    profile_picture_normal: string

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
