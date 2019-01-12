import {User} from './user'

export class I7eventImage {
  id: string
  i7event: string
  image_raw: string
  image_1: string
  image_2: string
  author: User

  constructor(values: Object = {}) {
    Object.assign(this, values)
    this.author = new User(this.author)
  }

}
