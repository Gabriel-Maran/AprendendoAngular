import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { DailyTasks } from '../../../model/DailyTasks';
import { Toggle } from '../../toggle/toggle';
import { DailyTasksService } from '../../../services/daily-tasks/daily-tasks-service';

@Component({
  selector: 'app-modal-daily-tasks',
  imports: [ReactiveFormsModule, Toggle],
  templateUrl: './modal-daily-tasks.html',
  styleUrl: './modal-daily-tasks.css',
})
export class ModalDailyTasks {
  dailyTasksService = inject(DailyTasksService);

  isOpen = input<boolean>(false);
  closeModal = output<void>();
  dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('modalDailyTasks');

  forms = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    }),
    description: new FormControl('', { nonNullable: true }),
    isDone: new FormControl(false, {
      nonNullable: true,
      validators: [Validators.required],
    }),
    coin: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
    xp: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(0)],
    }),
  });

  campos = [
    { id: 'title', label: 'Título', type: 'text' },
    { id: 'description', label: 'Descrição', type: 'text' },
    { id: 'coin', label: 'Coins', type: 'number' },
    { id: 'xp', label: 'XP', type: 'number' },
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

      const newDailyTask: DailyTasks = {
        id: Date.now(),
        title: formsValues.title,
        description: formsValues.description,
        isDone: formsValues.isDone,
        coin: formsValues.coin,
        xp: formsValues.xp,
      };

      this.dailyTasksService.addDailyTasks(newDailyTask);
      this.close();
    }
  }

  mudaIsDone() {
    const valorAtual = this.forms.get('isDone')?.value;
    this.forms.patchValue({ isDone: !valorAtual });
  }
}
