import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { User } from '../../../../shared/models/user'

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  @Output() onUserAdd: EventEmitter<User> = new EventEmitter()
  searchResult: User[] = []
  searchText: string

  constructor() { }

  ngOnInit() {
  }

  onChangeSearchInput(value: string) {
    console.log(value)
  }

  emitEvent(user: User) {
    this.onUserAdd.emit(user)
  }

}
