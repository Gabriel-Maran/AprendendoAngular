import { Component, computed, effect, inject, signal } from '@angular/core';
import { ModalReward } from '../../modal/modal-reward/modal-reward';
import { Reward } from '../../../model/Reward';
import { RewardService } from '../../../services/reward/reward-service';
import { Rarity } from '../../../model/Rarity';

@Component({
  selector: 'app-compras-view',
  imports: [ModalReward],
  templateUrl: './compras-view.html',
  styleUrl: './compras-view.css',
})
export class ComprasView {
  rewardService = inject(RewardService);
  comprasRaw = signal<Reward[]>(this.rewardService.getAll());
  modalOpen = signal<boolean>(false);

  compras = computed(() => {
    const categorias = this.comprasRaw().reduce(
      (acc, item) => {
        acc[item.rarity]?.push(item);
        return acc;
      },
      { common: [], rare: [], epic: [], legendary: [] } as Record<string, Reward[]>,
    );

    return [
      ...(categorias['legendary'] ?? []),
      ...(categorias['epic'] ?? []),
      ...(categorias['rare'] ?? []),
      ...(categorias['common'] ?? []),
    ];
  });

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.atualizarLista();
  }

  comprar(rId: number) {
    this.rewardService.buyReward(rId);
    this.atualizarLista();
  }

  usar(rId: number) {
    this.rewardService.useReward(rId);
    this.atualizarLista();
  }

  traduzirRaridade(rarity: Rarity): string {
    switch (rarity) {
      case 'legendary':
        return 'Lendário';
      case 'epic':
        return 'Épico';
      case 'rare':
        return 'Raro';
      default:
        return 'Comum';
    }
  }

  private atualizarLista() {
    this.comprasRaw.set(this.rewardService.getAll());
  }
}
