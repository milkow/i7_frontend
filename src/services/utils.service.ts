import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { FormGroup } from '@angular/forms'
import { BaseApiError } from '../modules/utils/BaseApiError'
import { I7Event } from '../shared/models/i7event';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  setErrors<T extends BaseApiError>(error: HttpErrorResponse, formGroup: FormGroup): T {
    debugger
    const err = this.getError<T>(error)
    Object.keys(formGroup.controls).forEach(key => {
      if (err[key]) {
        formGroup.controls[key].setErrors({backend: true})
        formGroup.controls[key].markAsTouched()
      }
    })
    return err
  }

  getError<T extends BaseApiError>(error: HttpErrorResponse): T {
    const properties = Object.keys(error.error)
    const t =  {} as T
    properties.forEach(x => {
     t[x] = (error.error[x] as Array<string>).join(' ')
    })
    return t
  }

  getTimeDiffFormatted(event: I7Event): string {
    const startDate = new Date(event.start).getTime()
    const now = new Date().getTime()
    let delta = Math.abs(startDate - now) / 1000


    const days = Math.floor(delta / 86400)
    delta -= days * 86400

    if (startDate < now) {
      return `${days} days ago`
    }

    const hours = Math.floor(delta / 3600) % 24
    delta -= hours * 3600

    return `in ${days} days and ${hours} hours`
  }
}
