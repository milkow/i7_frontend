export class RestorePassword {
    password: string
    logout_other_sessions: boolean

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
