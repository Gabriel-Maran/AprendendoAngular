import { Injectable, inject, signal, NgZone } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { DailyTasksService } from '../daily-tasks/daily-tasks-service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly STORAGE_KEY = 'TIMER-STORAGE';
  private localStorageService = inject(LocalStorage);
  private dailyTasksService = inject(DailyTasksService);
  private ngZone = inject(NgZone);

  private diaSalvo = signal<string | null>(this.localStorageService.get<string>(this.STORAGE_KEY));

  constructor() {
    this.verificarMudancaDeDiaInicial();
    this.iniciarVerificacaoContinua();
  }

  private getFormatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private verificarMudancaDeDiaInicial(): void {
    const hojeStr = this.getFormatDate(new Date());
    const salvo = this.diaSalvo();

    if (!salvo) {
      // Primeira vez: só salva o dia, SEM resetar tarefas
      this.diaSalvo.set(hojeStr);
      this.localStorageService.set(this.STORAGE_KEY, hojeStr);
      return;
    }

    if (hojeStr !== salvo) {
      // Dia mudou entre sessões: aí sim reseta
      this.executarMudancaDeDia(hojeStr);
    }
  }

  private verificarMudancaDeDia(): void {
    const hojeStr = this.getFormatDate(new Date());

    if (hojeStr !== this.diaSalvo()) {
      this.ngZone.run(() => {
        this.executarMudancaDeDia(hojeStr);
      });
    }
  }

  private iniciarVerificacaoContinua(): void {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => this.verificarMudancaDeDia(), 30_000);
    });
  }

  private executarMudancaDeDia(novoDia: string): void {
    console.log(`Dia mudou para ${novoDia}. Reiniciando tarefas...`);
    this.diaSalvo.set(novoDia);
    this.localStorageService.set(this.STORAGE_KEY, novoDia);
    this.dailyTasksService.resetAllTasks();
  }

  public obterDiaSalvo() {
    return this.diaSalvo.asReadonly();
  }
}
