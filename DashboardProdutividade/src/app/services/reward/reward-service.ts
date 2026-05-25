import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { Reward } from '../../model/Reward';
import { CoinService } from '../coin/coin-service';

@Injectable({
  providedIn: 'root',
})
export class RewardService {
  private storage = inject(LocalStorage);
  coinService = inject(CoinService);

  compras = signal<Reward[]>([]);
  private readonly LOCALNAME = 'REWARD-STORAGE';

  constructor() {
    this.compras.set(this.storage.get(this.LOCALNAME) ?? []);

    effect(() => {
      this.storage.set(this.LOCALNAME, this.compras());
    });
  }

  getAll(): Reward[] {
    return this.compras();
  }

  getRewardById(id: number): Reward | null {
    return this.compras().find((item) => item.id === id) || null;
  }

  addReward(reward: Reward) {
    this.compras.update((items) => [...items, reward]);
  }

  buyReward(rewardId: number) {
    const reward = this.getRewardById(rewardId);
    if (!reward) {
      throw new Error('Reward not found by id: ' + rewardId);
    }

    const buyed = this.coinService.spendCoins(reward.value);
    if (!buyed) {
      throw new Error('You cannot buy it, grind more money!');
    }

    this.compras.update((items) =>
      items.map((item) => (item.id === rewardId ? { ...item, purchased: true } : item)),
    );
  }

  useReward(rewardId: number) {
    const reward = this.getRewardById(rewardId);
    if (!reward) {
      throw new Error('Reward not found by id: ' + rewardId);
    }
    if (!reward.purchased) {
      throw new Error('You cannot use, didnt purchased');
    }
    this.compras.update((items) =>
      items.map((item) => (item.id === rewardId ? { ...item, is_used: true } : item)),
    );
  }
}
