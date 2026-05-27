import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { CoinService } from '../coin/coin-service';
import { XpBarService } from '../xp-bar/xp-bar-service';
import { Mission } from '../../model/Mission';

@Injectable({
  providedIn: 'root',
})
export class MissionsService {
  private readonly storage = inject(LocalStorage);
  private readonly coinService = inject(CoinService);
  private readonly xpService = inject(XpBarService);
  private readonly LOCALNAME = 'MISSION-STORAGE';

  readonly mission = signal<Mission[]>([]);

  constructor() {
    this.mission.set(this.storage.get(this.LOCALNAME) ?? []);

    effect(() => {
      this.storage.set(this.LOCALNAME, this.mission());
    });
  }

  getAll(): Mission[] {
    return this.mission();
  }

  getMissionById(id: number): Mission | null {
    return this.mission().find((item: Mission) => item.id === id) || null;
  }

  addMission(mission: Mission): void {
    this.mission.update((items: Mission[]) => [...items, mission]);
  }

  doneMission(id: number): void {
    const mission = this.getMissionById(id);
    if (!mission) return;

    this.coinService.addCoins(Number(mission.coin ?? 0));
    this.xpService.adcXP(Number(mission.xp ?? 0));

    this.mission.update((item) => item.filter((item) => item.id !== id));
  }
}
