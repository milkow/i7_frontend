export const enum NotificationType {
    Success,
    Error,
    Info
}

export class Notification {
    text: string
    type: NotificationType

    constructor(values: Object = {}) {
        Object.assign(this, values)
    }
}
