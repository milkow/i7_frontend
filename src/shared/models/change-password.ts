export class ChangePassword {
    old_password: string
    new_password: string

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
