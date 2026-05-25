import { Component, effect, inject, signal } from '@angular/core';
import { ModalReward } from '../modal-reward/modal-reward';
import { Reward } from '../../model/Reward';
import { RewardService } from '../../services/reward/reward-service';

@Component({
  selector: 'app-compras-view',
  imports: [ModalReward],
  templateUrl: './compras-view.html',
  styleUrl: './compras-view.css',
})
export class ComprasView {
  rewardService = inject(RewardService);

  modalOpen = signal<boolean>(false);
  compras = signal<Reward[]>([]);

  constructor() {
    effect(() => {
      this.compras.set(this.rewardService.getAll());
    });
  }

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.compras.set(this.rewardService.getAll());
  }

  comprar(rId: number) {
    this.rewardService.buyReward(rId);
  }

  usar(rId: number) {
    this.rewardService.useReward(rId);
  }
}
