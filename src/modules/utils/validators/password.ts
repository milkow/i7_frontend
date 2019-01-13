import {AbstractControl} from '@angular/forms'
export class PasswordValidation {

    static MatchPassword(AC: AbstractControl) {
       const password = AC.get('password').value
       const confirmPassword = AC.get('confirmPassword').value
       return password !== confirmPassword ? AC.get('confirmPassword').setErrors( {MatchPassword: true} ) : null
    }

    static MatchChangePassword(AC: AbstractControl) {
        const password = AC.get('new_password').value
        const confirmPassword = AC.get('confirmPassword').value
        return password !== confirmPassword ? AC.get('confirmPassword').setErrors( {MatchPassword: true} ) : null
     }
}
