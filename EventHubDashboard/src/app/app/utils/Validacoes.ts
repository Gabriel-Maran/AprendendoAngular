import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class Validacoes {
  static naoPodeSer(valorProibido: any): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const valorControle = control.value;
      if (valorControle === valorProibido) {
        return { valorInvalido: true };
      }
      return null;
    };
  }

  static capacidadeLimite: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const inscritos = control.get('inscritos')?.value;
    const capacidade = control.get('capacidadeMaxima')?.value;

    if (inscritos === null || capacidade === null) {
      return null;
    }
    return inscritos > capacidade ? { inscritosExcedidos: true } : null;
  };
}
