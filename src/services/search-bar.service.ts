import { Injectable, OnInit } from '@angular/core'
import { Observable, Subject } from 'rxjs'

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
export class SearchBarService implements OnInit {
  search = ''
  receivedData: boolean
  loading: boolean
  visible = false
  options: ISearchBarOptions = { mode: SearchMode.GlobalSearch, options: [] }
  option$: Subject<ISearchBarOptions> = new Subject()

  constructor() { }

  ngOnInit() {
  }

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

  hide() {
    this.search = ''
    this.visible = false
  }

  show() {
    this.visible = true
  }
}
