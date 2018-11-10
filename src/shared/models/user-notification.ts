import {User} from './user'

export enum UserNotificationType {
  friendRequest = 100,
  friendRequestAccepted = 200,
  i7event_invitation = 300,
}

export class UserNotification {
  id: string
  object_id: string
  initiator: User
  type: UserNotificationType
  seen: boolean
  created: string
  extra: any

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
