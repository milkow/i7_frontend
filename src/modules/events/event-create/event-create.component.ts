import { Component, OnInit, Input, EventEmitter } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { HappeningService } from '../../../services/happening.service'
import { HttpErrorResponse } from '@angular/common/http'
import { FormControl,  FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material'
import { ICoordinate } from '../../../shared/models/map'
import { Location } from '@angular/common'
import { LocationComponent } from '../../utils/components/location/location.component'
import { NotificationService } from '../../../services/notification.service'
import { NotificationType } from '../../../shared/models/notification'
import * as consts from '../../../shared/constants'
import { BaseApiError } from '../../utils/BaseApiError'

class EventCreateError extends BaseApiError {
  title: string
  description: string
  start: string
  end: string
}

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  happening: Happening
  hours = Array.from(Array(24).keys())
  form: FormGroup
  coordinates: ICoordinate
  placeOfInterest: string
  selectedFile: File
  error: EventCreateError
  submitted: boolean
  destroy: EventEmitter<any>

  constructor(private happeningService: HappeningService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private location: Location,
    public notificationService: NotificationService) {
    this.happening = new Happening()
    this.createForm()
    this.destroy = new EventEmitter()
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
      endHour: new FormControl('', [])
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

    this.happening = new Happening({
      title: this.form.controls.title.value,
      description: this.form.controls.description.value,
      start: this.getFormattedStartDate(),
      end: this.getFormattedEndDate(),
      coordinates: this.coordinates
    })

    return this.createHappening(this.happening)
  }

  createHappening(happening: Happening) {
    return this.happeningService.createHappening(happening)
    .subscribe((created) => {
      this.happeningService.publishHappening(created.id, this.selectedFile)
        .subscribe(() => {
          this.destroy.emit()
          this.notificationService.push({type: NotificationType.Success, text: consts.eventCreated})
          this.router.navigate([`/events/${created.id}`])
        })
    },
    (err: HttpErrorResponse) => {
      this.error = this.getError(err)
      this.setErrors(this.error, this.form)
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
  
  openLocationDialog() {
    this.dialog.open(LocationComponent, {
      height: '800px',
      width: '800px'
    })
    .afterClosed()
    .subscribe(result => {
      if (!result) {
        return
      }

      this.coordinates = result.coords
      this.placeOfInterest = result.poi
    })
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
    (this.router.url.indexOf('events/create') !== -1) ? this.location.back() : this.destroy.emit()
  }
}
