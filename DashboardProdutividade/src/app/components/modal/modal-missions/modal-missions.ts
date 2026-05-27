import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { MissionsService } from '../../../services/missions/missions-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mission } from '../../../model/Mission';

@Component({
  selector: 'app-modal-missions',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-missions.html',
  styleUrl: './modal-missions.css',
})
export class ModalMission {
  missionService = inject(MissionsService);

  isOpen = input<boolean>(false);
  closeModal = output<void>();
  dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('modalDailyTasks');

  forms = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    }),
    description: new FormControl('', { nonNullable: true }),
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

      const newMission: Mission = {
        id: Date.now(),
        title: formsValues.title,
        description: formsValues.description,
        coin: formsValues.coin!,
        xp: formsValues.xp!,
      };

      this.missionService.addMission(newMission);
      this.close();
    }
  }
}
