import {AbstractControl} from '@angular/forms'
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value
       const confirmPassword = AC.get('password1').value
       return password !== confirmPassword ? AC.get('password1').setErrors( {MatchPassword: true} ) : null
    }
}
