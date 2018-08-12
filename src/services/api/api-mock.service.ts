import { Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { Observable, of } from 'rxjs'
import { Http } from '@angular/http'
import { Happening } from '../../shared/models/Happening'

const API_URL = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class ApiMockService {
  constructor(
    private http: Http
  ) { }

  public getHappenings() {
    return of(happenings)
}

  private handleError(error: Response | any) {
    console.error('ApiService::handleError', error)
    return Observable.throw(error)
  }

}

  const happenings: Happening[] = [
    {
      id: 1,
      start: Date.UTC(2017, 9, 1, 10, 0),
      avatar: '/assets/avatars/2.jpg',
      title: 'Kayaking',
      cover: '/assets/happening_covers/1.jpg',
      content: 'The syntax {D1,D2,...,Dn} denotes a tuple whose arguments are D1, D2, ... Dn. Messages can be sent to and received from ports, but these messages must obey the so-called "port protocol." Do you have any idea why this is not working? Messages can be sent to and received from ports, but these messages must obey the so-called "port protocol." Any element of a tuple can be accessed in constant time.',
      pros: 14,
      cons: 0,
    },
    {
      id: 1,
      start: Date.UTC(2017, 11, 3, 22, 0),
      avatar: '/assets/avatars/13.jpg',
      title: 'Rock NOW',
      cover: '/assets/happening_covers/3.jpg',
      content: 'Erlang is known for its designs that are well suited for systems. Where are my pants? Atoms are used within a program to denote distinguished values. Any element of a tuple can be accessed in constant time. In 1989 the building was heavily damaged by fire, but it has since been restored.',
      pros: 32,
      cons: 8,
    },
    {
      id: 1,
      start: Date.UTC(2018, 1, 8, 17, 30),
      avatar: '/assets/avatars/14.jpg',
      title: 'Lovely Skying',
      cover: '/assets/happening_covers/4.jpg',
      content: 'Tuples are containers for a fixed number of Erlang data types. Atoms can contain any character if they are enclosed within single quotes and an escape convention exists which allows any character to be used within an atom. Haskell features a type system with type inference and lazy evaluation. Erlang is a general-purpose, concurrent, functional programming language. Any element of a tuple can be accessed in constant time.',
      pros: 204,
      cons: 1,
    },
    {
      id: 1,
      start: Date.UTC(2017, 8,1, 20, 0),
      avatar: '/assets/avatars/9.jpg',
      title: 'Tor in New York',
      cover: '/assets/happening_covers/5.jpg',
      content: 'It is also a garbage-collected runtime system. I don\'t even care. The syntax {D1,D2,...,Dn} denotes a tuple whose arguments are D1, D2, ... Dn. Make me a sandwich. The Galactic Empire is nearing completion of the Death Star, a space station with the power to destroy entire planets.',
      pros: 42,
      cons: 3,
    },
  ]
