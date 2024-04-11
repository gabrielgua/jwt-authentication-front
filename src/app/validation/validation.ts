import { AbstractControl, ValidatorFn } from "@angular/forms";

export default class Validation {


    static match(controlName: string, checkControlName: string): ValidatorFn {
        return (controls: AbstractControl) => {
            const control = controls.get(controlName);
            const checkControl = controls.get(checkControlName);

            if (checkControl?.errors && !checkControl.errors['differs']) {
                return null;
            }

            if (control?.value !== checkControl?.value) {
                checkControl?.setErrors({ differs: true });
                return { differs: true }
            }


            return null;
        }
    }
}