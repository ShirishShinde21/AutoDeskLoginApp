import {AbstractControl} from '@angular/forms'

export function UsernameValidator(control:AbstractControl): {[key:string]:boolean}|null{
    
    const username=control.get('username');
    const confirmUsername=control.get('confirmUsername');

    return username && confirmUsername && (username.value != confirmUsername.value) ? {'UsernameMismatch':true}:null;

};