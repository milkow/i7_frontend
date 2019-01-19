import {Component, OnInit, ViewChild} from '@angular/core'
import {Location} from '@angular/common'
import {ElementRef} from '@angular/core'
import {I7EventService} from '../../../../services/i7event.service'
import {I7Event} from '../../../../shared/models/i7event'
import {I7eventImage} from '../../../../shared/models/i7event-image'
import {Router} from '@angular/router'

@Component({
  selector: 'app-i7event-add-photo',
  templateUrl: './i7event-add-photo.component.html',
  styleUrls: ['./i7event-add-photo.component.scss']
})
export class I7eventAddPhotoComponent implements OnInit {
  @ViewChild('fileUpload') uploadInput: ElementRef

  file?: File = null
  filePreview = ''

  loaded: boolean
  events: I7Event[]

  selectedEvent: I7Event
  uploading = false

  errorMsg = ''

  constructor(
    private location: Location,
    private eventService: I7EventService,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.loaded = false
    this.events = []
    this.eventService.list({'liked-only': '1', 'only-ongoing': true}).subscribe(this.receiveEvents)
  }

  goBack() {
    this.location.back()
  }

  onFileChane = (event) => {
    const files = event.target.files
    if (!files.length) {
      return
    }

    this.file = files[0]
    this.previewFile(this.file)
  }

  previewFile = (file: File) => {
    const rd = new FileReader()
    rd.onload = (e: any) => {
      this.filePreview = e.target.result
    }
    rd.readAsDataURL(file)
  }

  receiveEvents = (events: I7Event[]) => {
    this.loaded = true
    this.events = events
  }

  selectCallback = (i7event) => {
    this.selectedEvent = i7event
  }

  isUploadDisabled() {
    return !Boolean(this.selectedEvent) || this.uploading
  }

  upload() {
    if (!this.file || !this.selectedEvent) {
      return
    }
    this.uploading = true

    this.eventService.uploadImage(this.selectedEvent.id, this.file).subscribe(this.handleUploaded, this.handleError)
  }

  handleUploaded = (data) => {
    const image = new I7eventImage(data)
    this.router.navigate(['/events', image.i7event, 'photos'])
  }

  handleError = (err) => {
    this.uploading = false

    if (err.status === 400) {
      if (err.error && err.error.image_raw) {
        this.errorMsg = err.error.image_raw.join(' ')
        return
      }
    }

    if (err.status === 413) {
      this.errorMsg = 'Image is too large.'
      return
    }

    this.errorMsg = 'Some error occurred during image upload.'
  }
}
