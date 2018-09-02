export class Happening {
  id: string
  author: number
  image: string
  title: string
  description: string
  start: Date
  end: Date

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
