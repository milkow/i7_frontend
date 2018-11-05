import {ICoordinate, IGeometry} from './map'
import {User} from './user'

export class I7Event {
  id: string
  author: User
  image_normal: string
  image_medium: string
  image_small: string
  title: string
  description: string
  coordinates: ICoordinate
  geo_coordinates?: IGeometry
  start: Date
  end: Date
  likes: number
  my_like: boolean

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }

  isLong(): boolean {
    return this.description.length > 300
  }

  getShortDescription() {
    if (this.isLong()) {
      return this.description.substr(0, 300) + '...'
    }
    return this.description
  }
}
