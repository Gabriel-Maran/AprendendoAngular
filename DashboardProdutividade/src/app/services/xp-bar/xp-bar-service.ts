import { effect, inject, Injectable, signal } from '@angular/core';
import { CoinService } from '../coin/coin-service';
import { LocalStorage } from '../local-storage/local-storage';

@Injectable({
  providedIn: 'root',
})
export class XpBarService {
  private storage = inject(LocalStorage);
  private coinService = inject(CoinService);
  private readonly LOCALNAME = 'XP-STORAGE';

  // [ACTXP, GAPLEVEL, ACTLEVEL, MAXLEVEL]
  xp = signal<number[]>(this.storage.get(this.LOCALNAME) ?? [0, 15, 0, 0]);

  constructor() {
    // Grava automaticamente no LocalStorage sempre que o XP mudar
    effect(() => {
      this.storage.set(this.LOCALNAME, this.xp());
    });
  }

  getActXp() {
    return this.xp()[0];
  }
  getGapLevel() {
    return this.xp()[1];
  }
  getLevel() {
    return this.xp()[2];
  }
  getMaxLevel() {
    return this.xp()[3];
  }

  adcXP(qntdd: number): void {
    const current = this.xp();

    let actXp: number = Number(current[0]) + Number(qntdd);
    let gapLevel: number = Number(current[1]);
    let level: number = Number(current[2]);
    let maxLevel: number = Number(current[3]);

    while (Number(actXp) >= Number(gapLevel)) {
      actXp -= Number(gapLevel);
      level += 1;
      gapLevel = Number(this.calcNextLevelGap(level));

      if (Number(level) > Number(maxLevel)) {
        this.reciveRewardLevel(Number(level));
        maxLevel = Number(level);
      }
    }

    this.xp.set([Number(actXp), Number(gapLevel), Number(level), Number(maxLevel)]);
  }

  subXp(qntdd: number): void {
    const current = this.xp();

    let actXp: number = Number(current[0]) - Number(qntdd);
    let gapLevel: number = Number(current[1]);
    let level: number = Number(current[2]);
    const maxLevel: number = Number(current[3]);

    while (actXp < 0) {
      if (level === 0) {
        actXp = 0;
        break;
      }

      level -= 1;
      gapLevel = Number(this.calcNextLevelGap(level));
      actXp = Number(gapLevel + actXp);
    }
    this.xp.set([Number(actXp), Number(gapLevel), Number(level), Number(maxLevel)]);
  }

  private calcNextLevelGap(num: number): number {
    return Number(num) * 4 + 15;
  }

  private reciveRewardLevel(nextLevel: number) {
    const rewardCoins = 10 + Number(nextLevel) * 5;
    this.coinService.addCoins(rewardCoins);
  }
}
