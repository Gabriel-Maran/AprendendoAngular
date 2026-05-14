import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNowOrGreater(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const dataInserida = new Date(control.value).getTime();
    const agora = Date.now();

    return dataInserida < agora ? { dataPassada: { agora, inserida: dataInserida } } : null;
  };
}
