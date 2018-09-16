import { IGeometry } from './map'

export class Happening {
  id: string
  author: number
  image: string
  title: string
  description: string
  location_latitude: number
  location_longitude: number
  start: Date
  end: Date

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
