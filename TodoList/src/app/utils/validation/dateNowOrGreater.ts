import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function dateNowOrGreater(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.value) return null;

    const inicioDia = new Date();
    inicioDia.setHours(0, 0, 0, 0);
    const dataAux = new Date(control.value + 'T00:00');
    dataAux.setHours(0, 0, 0, 0);
    console.log(inicioDia);
    console.log(dataAux);
    return dataAux < inicioDia ? { dataPassada: { inicioDia, inserida: dataAux } } : null;
  };
}
