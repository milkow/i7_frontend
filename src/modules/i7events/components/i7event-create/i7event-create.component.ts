import { Component, OnInit } from '@angular/core'
import { I7Event } from '../../../../shared/models/i7event'
import { I7EventService } from '../../../../services/i7event.service'
import { HttpErrorResponse } from '@angular/common/http'
import { FormControl,  FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { ICoordinate } from '../../../../shared/models/map'
import { Location } from '@angular/common'
import { NotificationService } from '../../../../services/notification.service'
import { BaseApiError } from '../../../utils/BaseApiError'
import { IEventLocation } from '../i7-event-location/i7-event-location.component'

class EventCreateError extends BaseApiError {
  title: string
  description: string
  start: string
  end: string
}

@Component({
  selector: 'app-event-create',
  templateUrl: './i7event-create.component.html',
  styleUrls: ['./i7event-create.component.scss']
})
export class I7EventCreateComponent implements OnInit {
  setLocationPanelVisibility = false
  loading: boolean
  i7event: I7Event
  hours = Array.from(Array(24).keys())
  form: FormGroup
  coordinates: ICoordinate
  placeOfInterest: string
  selectedFile: File
  error: EventCreateError
  submitted: boolean

  constructor(private eventService: I7EventService,
    private formBuilder: FormBuilder,
    private router: Router,
    private location: Location,
    public notificationService: NotificationService) {
    this.i7event = new I7Event()
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.form = this.formBuilder.group({
      title: new FormControl('', [Validators.required]),
      description: new FormControl('', []),
      start: new FormControl('', [Validators.required]),
      startHour: new FormControl('', []),
      end: new FormControl('', [Validators.required]),
      endHour: new FormControl('', []),
      public: new FormControl('false', [])
    })
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  getFormattedStartDate() {
    if (this.form.controls.start.value === '') {
      return null
    }
    this.form.controls.start.value.setHours(this.form.controls.startHour.value)

    return this.form.controls.start.value
  }

  getFormattedEndDate() {
    if (this.form.controls.end.value === '') {
      return null
    }
    this.form.controls.end.value.setHours(this.form.controls.endHour.value)

    return this.form.controls.end.value
  }

  submitForm() {
    this.submitted = true
    if (!this.form.valid || !this.selectedFile || !this.coordinates) {
      return
    }

    this.i7event = new I7Event({
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      start: this.getFormattedStartDate(),
      end: this.getFormattedEndDate(),
      coordinates: this.coordinates,
      public: this.form.controls.public.value
    })

    return this.createI7Event(this.i7event)
  }

  createI7Event(event: I7Event) {
    this.loading = true
    return this.eventService.create(event)
    .subscribe((created) => {
      this.eventService.publish(created.id, this.selectedFile)
        .subscribe(() => {
          this.router.navigate([`/events/${created.id}`])
        })
    },
    (err: HttpErrorResponse) => {
      this.error = this.getError(err)
      this.setErrors(this.error, this.form)
      this.loading = false
    })
  }

  setErrors(error: any, formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(key => {
      if (error[key]) {
        formGroup.controls[key].setErrors({backend: true})
        formGroup.controls[key].markAsTouched()
      }
    })
  }

  getError<T extends BaseApiError>(error: HttpErrorResponse): T {
    const properties = Object.keys(error.error)
    const t =  {} as T
    properties.forEach(x => {
     t[x] = (error.error[x] as Array<string>).join(' ')
    })
    return t
  }

  setLocation() {
    this.setLocationPanelVisibility = true
  }

  getSetLocationColor() {
    if (this.submitted && !this.coordinates) {
      return 'warn'
    } else {
      return 'primary'
    }
  }

  choosePhotoColor() {
    if (this.submitted && !this.selectedFile) {
      return 'warn'
    } else {
      return 'primary'
    }
  }

  getFormattedPlaceOfInterest() {
    return this.placeOfInterest.length < 25 ? this.placeOfInterest : `${this.placeOfInterest.slice(0, 25)}...`
  }

  getFormattedPhotoName() {
    return this.selectedFile.name.length < 10 ? this.selectedFile.name : `${this.selectedFile.name.slice(0, 13)}...`
  }

  back = () => {
    if (this.router.url.indexOf('events/create') !== -1) {
      this.location.back()
    }
  }

  handleSetLocationBackPressed() {
    this.setLocationPanelVisibility = false
  }

  handleSetLocationSubmit(location: IEventLocation) {
    this.coordinates = location.coords
    this.placeOfInterest = location.poi
    this.setLocationPanelVisibility = false
  }

}
