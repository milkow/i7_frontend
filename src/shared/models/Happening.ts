export class Happening {
  id: number
  start: number
  avatar: string
  title: string
  image: string
  content: string
  pros: number
  cons: number

  constructor(values: Object = {}) {
    Object.assign(this, values)
  }
}
