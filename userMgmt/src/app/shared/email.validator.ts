import { AbstractControl, ValidatorFn } from '@angular/forms';

export class EmailValidators {

    static validEmail(email: string): ValidatorFn {
        return (c: AbstractControl): { [key: string]: any } | null => {
            var val = c.value;
            console.log(c.value);
            var regEx = new RegExp(`[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+`)
            //if (c.touched || (c.dirty) && c.errors) {
             //   return { 'emailV': true };
            //}
            return regEx.test(val)?null:{'validEmail':true};            
        };        
    }
}
