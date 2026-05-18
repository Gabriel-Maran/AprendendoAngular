import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validacoes {
  static naoPodeSer(valorProibido: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      return control.value === valorProibido ? { valorInvalido: true } : null;
    };
  }
}
