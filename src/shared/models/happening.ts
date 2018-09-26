import { ICoordinate, IGeometry } from './map'

export class Happening {
  id: string
  author: number
  image_normal: string
  image_medium: string
  image_small: string
  title: string
  description: string
  coordinates: ICoordinate
  geo_coordinates?: IGeometry
  start: Date
  end: Date

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
