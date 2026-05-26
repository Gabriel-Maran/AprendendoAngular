import { effect, inject, Injectable, signal } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { DailyTasks } from '../../model/DailyTasks';
import { CoinService } from '../coin/coin-service';
import { XpBarService } from '../xp-bar/xp-bar-service';

@Injectable({
  providedIn: 'root',
})
export class DailyTasksService {
  private readonly storage = inject(LocalStorage);
  private readonly coinService = inject(CoinService);
  private readonly xpService = inject(XpBarService);
  private readonly LOCALNAME = 'DAILY-TASKS-STORAGE';

  readonly dailyTasks = signal<DailyTasks[]>([]);

  constructor() {
    this.dailyTasks.set(this.storage.get(this.LOCALNAME) ?? []);

    effect(() => {
      this.storage.set(this.LOCALNAME, this.dailyTasks());
    });
  }

  getAll(): DailyTasks[] {
    return this.dailyTasks();
  }

  getHabitoById(id: number): DailyTasks | null {
    return this.dailyTasks().find((item) => item.id === id) || null;
  }

  addDailyTasks(dailyTask: DailyTasks): void {
    this.dailyTasks.update((items) => [...items, dailyTask]);
  }

  doneDailyTask(id: number): void {
    const dailyTask = this.getHabitoById(id);
    if (!dailyTask || dailyTask.isDone) return;

    this.coinService.addCoins(dailyTask.coin ?? 0);
    this.xpService.adcXP(dailyTask.xp ?? 0);

    this.dailyTasks.update((tasks) =>
      tasks.map((item) => (item.id === id ? { ...item, isDone: true } : item)),
    );
  }

  resetAllTasks() {
    this.dailyTasks.update((tasks) => tasks.map((item) => ({ ...item, isDone: true })));
  }
}
