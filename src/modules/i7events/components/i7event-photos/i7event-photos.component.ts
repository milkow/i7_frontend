import {Component, Input, OnInit} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7eventImage} from '../../../../shared/models/i7event-image'
import {I7Event} from '../../../../shared/models/i7event'
import {ActivatedRoute} from '@angular/router'
import {User} from '../../../../shared/models/user'
import {UserService} from '../../../../services/user.service'
import {Observable} from 'rxjs'
import {MatDialog} from '@angular/material'
import {ImageDeleteDialogComponent} from '../image-delete-dialog/image-delete-dialog.component'

@Component({
  selector: 'app-event-photos',
  templateUrl: './i7event-photos.component.html',
  styleUrls: ['./i7event-photos.component.scss']
})
export class I7EventPhotosComponent implements OnInit {
  images: I7eventImage[]
  loaded: boolean
  i7event: I7Event
  currentUser: Observable<User>

  constructor(
    private eventService: I7EventService,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.init()
  }

  init = () => {
    this.loaded = false
    this.images = []
    // TODO fix this
    this.activatedRoute.params.subscribe((params: any) => {
      this.eventService.listEventImages(params['id']).subscribe(this.receiveImages)
      this.eventService.get(params['id']).subscribe(this.receiveI7Event)
    })
    this.currentUser = this.userService.getCurrentUser()
  }

  receiveImages = (images: I7eventImage[]) => {
    this.loaded = true
    this.images = images
  }

  receiveI7Event = (i7event) => {
    this.i7event = i7event
  }

  likeImage(image: I7eventImage) {
    if (image.my_like) {
      this.eventService.unlikeEventImage(this.i7event.id, image.id)
      image.my_like = false
      image.likes -= 1
    } else {
      this.eventService.likeEventImage(this.i7event.id, image.id)
      image.my_like = true
      image.likes += 1
    }
  }

  deleteImage = (image: I7eventImage) => {
    this.dialog.open(ImageDeleteDialogComponent, {
      data: {
        image: image,
      }
    }).afterClosed().subscribe(result => {
      if (result.deleted) {
        this.init()
      }
    })
  }
}
