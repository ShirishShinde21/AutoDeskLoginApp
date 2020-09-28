import {AbstractControl} from '@angular/forms'

export function WhiteSpaceValidator(control:AbstractControl): {[key:string]:boolean}|null{
    
    const stringlength=control.value.trim().length===0;
    return stringlength ? {'whitespace':true}:null;

};