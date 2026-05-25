import { Component, effect, ElementRef, inject, input, output, viewChild } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Rarity } from '../../model/Rarity';
import { RewardService } from '../../services/reward/reward-service';
import { Reward } from '../../model/Reward';

@Component({
  selector: 'app-modal-reward',
  imports: [ReactiveFormsModule],
  templateUrl: './modal-reward.html',
  styleUrl: './modal-reward.css',
})
export class ModalReward {
  rewardService = inject(RewardService);

  isOpen = input<boolean>(false);
  closeModal = output<void>();
  dialogElement = viewChild.required<ElementRef<HTMLDialogElement>>('modalReward');

  // Removido o campo 'id' do formulário já que o gera dinamicamente com Date.now()
  forms = new FormGroup({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.minLength(3), Validators.maxLength(25)],
    }),
    description: new FormControl('', { nonNullable: true }),
    value: new FormControl(0, {
      nonNullable: true,
      validators: [Validators.required, Validators.min(1)],
    }),
    rarity: new FormControl<Rarity>('common', {
      nonNullable: true,
      validators: [Validators.required],
    }),
  });

  campos = [
    { id: 'name', label: 'Nome', type: 'text' },
    { id: 'description', label: 'Descrição', type: 'text' },
    { id: 'value', label: 'Custo', type: 'number' },
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

      const newReward: Reward = {
        id: Date.now(),
        name: formsValues.name,
        description: formsValues.description,
        is_used: false,
        purchased: false,
        rarity: formsValues.rarity,
        value: formsValues.value,
      };

      this.rewardService.addReward(newReward);
      this.close();
    }
  }
}
