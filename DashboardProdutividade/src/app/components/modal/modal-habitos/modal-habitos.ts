import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HabitosService } from '../../../services/habitos/habitos-service';
import { Habitos } from '../../../model/Habitos';
import { form } from '@angular/forms/signals';
import { Toggle } from '../../toggle/toggle';

@Component({
  selector: 'app-modal-habitos',
  imports: [ReactiveFormsModule, Toggle],
  templateUrl: './modal-habitos.html',
  styleUrl: './modal-habitos.css',
})
export class ModalHabitos {
  habitosService = inject(HabitosService);

  isOpen = input<boolean>(false);
  closeModal = output<void>();
  dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('modalHabitos');

  forms = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    }),
    description: new FormControl('', { nonNullable: true }),
    isGood: new FormControl(false, [Validators.required]),
    coin: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
    xp: new FormControl<number | null>(null, {
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  campos = [
    { id: 'title', label: 'Título', type: 'text' },
    { id: 'description', label: 'Descrição', type: 'text' },
    { id: 'isGood', label: 'É benefico?', type: 'choice' },
    { id: 'xp', label: 'Coins', type: 'number' },
    { id: 'coin', label: 'XP', type: 'number' },
  ];

  constructor() {
    effect(() => {
      const dialog = this.dialogElement().nativeElement;
      if (this.isOpen()) {
        if (!dialog.open) dialog.showModal();
      } else {
        if (dialog.open) dialog.close();
      }
    });
  }

  close() {
    this.forms.reset();
    this.closeModal.emit();
  }

  onSubmit() {
    if (this.forms.valid) {
      const formsValues = this.forms.getRawValue();

      const newHabito: Habitos = {
        id: Date.now(),
        title: formsValues.title,
        description: formsValues.description,
        isGood: formsValues.isGood ?? false,
        coin: formsValues.coin!,
        xp: formsValues.xp!,
      };

      this.habitosService.addHabito(newHabito);
      this.close();
    }
  }

  mudaIsGood() {
    const valorAtual = this.forms.get('isGood')?.value;
    this.forms.patchValue({ isGood: !valorAtual });
  }
}
