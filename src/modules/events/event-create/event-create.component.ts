import { Component, OnInit, Input } from '@angular/core'
import { Happening } from '../../../shared/models/happening'
import { HappeningService } from '../../../services/happening.service'
import { HttpErrorResponse } from '@angular/common/http'
import { FormControl, NG_VALIDATORS, AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LocationComponent } from '../../utils/components/location/location.component';
import { ICoordinate } from '../../../shared/models/map';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.scss']
})
export class EventCreateComponent implements OnInit {
  happening: Happening
  hours = Array.from(Array(24).keys())
  myForm: FormGroup
  coordinates: ICoordinate
  placeOfInterest: string
  selectedFile: File
  backendError = {}
  submitted: boolean

  constructor(private happeningService: HappeningService,
    private formBuilder: FormBuilder,
    private router: Router,
    private dialog: MatDialog) {
    this.happening = new Happening()
    this.createForm()
  }

  ngOnInit() {
  }

  createForm() {
    this.myForm = this.formBuilder.group({
      title: new FormControl(this.myForm ? this.form.title.value : '', [this.backendValidator('title'), Validators.required]),
      description: new FormControl(this.myForm ? this.form.description.value : '', [this.backendValidator('description')]),
      startDate: new FormControl(this.myForm ? this.form.startDate.value : '', [this.backendValidator('start'), Validators.required]),
      startHour: new FormControl(this.myForm ? this.form.startHour.value : '', [this.backendValidator('start')]),
      endDate: new FormControl(this.myForm ? this.form.endDate.value : '', [this.backendValidator('end'), Validators.required]),
      endHour: new FormControl(this.myForm ? this.form.endHour.value : '', [ this.backendValidator('end')])
    })
  }

  get form(): any {
    return this.myForm.controls as any
  }

  onFileChanged(event) {
    this.selectedFile = event.target.files[0]
  }

  getFormattedStartDate() {
    if (this.form.startDate.value === '') {
      return null
    }
    this.form.startDate.value.setHours(this.form.startHour.value)

    return this.form.startDate.value
  }

  getFormattedEndDate() {
    if (this.form.endDate.value === '') {
      return null
    }
    this.form.endDate.value.setHours(this.form.endHour.value)

    return this.form.endDate.value
  }

  submitForm() {
    this.submitted = true
    this.removeError(this.form.title, 'backendError')
    this.removeError(this.form.description, 'backendError')
    this.removeError(this.form.startDate, 'backendError')
    this.removeError(this.form.startHour, 'backendError')
    this.removeError(this.form.endDate, 'backendError')
    this.removeError(this.form.endHour, 'backendError')
    console.log(this.myForm)

    if (!this.myForm.valid || !this.selectedFile || !this.coordinates) {
      return
    }

    this.happening = new Happening({
      title: this.form.title.value,
      description: this.form.description.value,
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
          this.router.navigate([`/events/${created.id}`])
        })
    },
    (err: HttpErrorResponse) => {
      this.backendError = err
      this.createForm()
    })
  }

  backendValidator(field: string): ValidatorFn {
    const self = this
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (!self.backendError) {
        return null
      }
      const error = this.backendError[field]
      return error ? {'backendError': this.backendError[field]} : null
    }
  }

  removeError(control: AbstractControl, error: string) {
    const err = control.errors
    if (err) {
      delete err[error]
      if (!Object.keys(err).length) {
        control.setErrors(null)
      } else {
        control.setErrors(err)
      }
    }
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
}
