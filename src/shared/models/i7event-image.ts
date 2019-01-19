import {User} from './user'

export class I7eventImage {
  id: string
  i7event: string
  image_raw: string
  image_1: string
  image_2: string
  author: User
  my_like: boolean
  likes: number

  constructor(values: Object = {}) {
    Object.assign(this, values)
    this.author = new User(this.author)
  }

}
