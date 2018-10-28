import { Injectable } from '@angular/core'
import { HttpErrorResponse } from '@angular/common/http'
import { FormGroup } from '@angular/forms'
import { BaseApiError } from '../modules/utils/BaseApiError'

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  constructor() { }

  setErrors<T extends BaseApiError>(error: HttpErrorResponse, formGroup: FormGroup): T {
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
}
