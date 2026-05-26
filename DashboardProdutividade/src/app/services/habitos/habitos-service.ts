import { effect, inject, Injectable, signal } from '@angular/core';
import { CoinService } from '../coin/coin-service';
import { LocalStorage } from '../local-storage/local-storage';
import { Habitos } from '../../model/Habitos';
import { XpBarService } from '../xp-bar/xp-bar-service';

@Injectable({
  providedIn: 'root',
})
export class HabitosService {
  // 1. Injeção de dependências padronizada com readonly
  private readonly storage = inject(LocalStorage);
  private readonly coinService = inject(CoinService);
  private readonly xpService = inject(XpBarService);
  private readonly LOCALNAME = 'HABITOS-STORAGE';
  private readonly habitosSignal = signal<Habitos[]>([]);

  readonly habitos = this.habitosSignal.asReadonly();

  constructor() {
    this.habitosSignal.set(this.storage.get(this.LOCALNAME) ?? []);

    effect(() => {
      this.storage.set(this.LOCALNAME, this.habitosSignal());
    });
  }

  getAll(): Habitos[] {
    return this.habitosSignal();
  }

  getHabitoById(id: number): Habitos | null {
    return this.habitosSignal().find((item) => item.id === id) || null;
  }

  addHabito(habito: Habitos): void {
    this.habitosSignal.update((items) => [...items, habito]);
  }

  useHabito(id: number): void {
    const habito = this.getHabitoById(id);
    if (!habito) return;
    const valorCoin = habito.coin ?? 0;
    const valorXp = habito.xp ?? 0;

    if (habito.isGood) {
      this.coinService.addCoins(valorCoin);
      this.xpService.adcXP(valorXp);
    } else {
      this.coinService.spendCoins(valorCoin);
      this.xpService.subXp(valorXp);
    }
  }
}
