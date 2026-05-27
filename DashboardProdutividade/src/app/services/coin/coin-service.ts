import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  private readonly LOCALNAME = 'COIN-STORAGE';
  private storage = inject(LocalStorage);
  coin = signal<number>(Number(this.storage.get(this.LOCALNAME) ?? 0));

  constructor() {
    effect(() => {
      this.storage.set(this.LOCALNAME, Number(this.coin()));
    });
  }

  addCoins(amount: number): void {
    this.coin.update((current: number) => Number(current) + Number(amount));
  }

  spendCoins(amount: number): boolean {
    if (this.coin() >= amount) {
      this.coin.update((current: number) => Number(current) - Number(amount));
      return true;
    }
    return false;
  }

  getCoins(): number {
    return Number(this.coin());
  }
}
