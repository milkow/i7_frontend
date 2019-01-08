import { Injectable } from '@angular/core'
import { Observable, Subject } from 'rxjs'
import { I7Event } from '../shared/models/i7event';

export interface IOptionValue {
  icon: string
  text: string
  handler: () => void
}

export enum SearchMode {
  GlobalSearch,
  ManageEventUsers
}

export interface ISearchBarOptions {
  options: IOptionValue[]
  mode: SearchMode
  eventId?: string
}

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  options: ISearchBarOptions
  option$: Subject<ISearchBarOptions> = new Subject()

  constructor() { }

  getOptions = (): Observable<ISearchBarOptions> => {
    return this.option$.asObservable()
  }

  setOptions = (options: ISearchBarOptions) => {
    this.options = options
    this.option$.next(this.options)
  }

  resetOptions = () => {
    this.options = { mode: SearchMode.GlobalSearch, options: [] }
    this.option$.next(this.options)
  }

}
