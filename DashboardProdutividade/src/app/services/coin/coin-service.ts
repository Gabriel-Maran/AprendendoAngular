import { Injectable } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class CoinService {
  coin: number = 0;
  LOCALNAME = 'COIN-STORAGE';

  constructor(private storage: LocalStorage) {
    const storedCoins = this.storage.get(this.LOCALNAME);
    this.coin = storedCoins ? Number(storedCoins) : 0;
  }

  addCoins(amount: number): void {
    this.coin += amount;
    this.saveToStorage();
  }

  spendCoins(amount: number): boolean {
    if (this.coin >= amount) {
      this.coin -= amount;
      this.saveToStorage();
      return true;
    }
    return false;
  }

  getCoins(): number {
    return this.coin;
  }

  private saveToStorage(): void {
    this.storage.set(this.LOCALNAME, this.coin);
  }
}
