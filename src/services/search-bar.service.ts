import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'

export interface IOptionValue {
  icon: string
  text: string
  handler: () => void
}

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  options: IOptionValue[]
  option$: Subject<IOptionValue[]> = new Subject()

  constructor() { }

  getOptions = (): Observable<IOptionValue[]> => {
    return this.option$.asObservable()
  }

  setOptions = (options: IOptionValue[]) => {
    this.options = options
    this.option$.next(this.options)
  }

}
