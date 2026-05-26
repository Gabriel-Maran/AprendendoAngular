import { Injectable, inject, signal } from '@angular/core';
import { LocalStorage } from '../local-storage/local-storage';
import { DailyTasksService } from '../daily-tasks/daily-tasks-service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private readonly STORAGE_KEY = 'TIMER-STORAGE';
  private localStorageService = inject(LocalStorage);
  private dailyTasksService = inject(DailyTasksService);

  private diaSalvo = signal<string>(
    this.localStorageService.get<string>(this.STORAGE_KEY) || this.getFormatDate(new Date()),
  );

  constructor() {
    this.localStorageService.set(this.STORAGE_KEY, this.diaSalvo());
    this.verificarMudancaDeDia();
    this.iniciarVerificacaoContinua();
  }

  private getFormatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  private verificarMudancaDeDia() {
    const hojeStr = this.getFormatDate(new Date());

    if (hojeStr !== this.diaSalvo()) {
      this.executarMudancaDeDia(hojeStr);
    }
  }

  private iniciarVerificacaoContinua() {
    setInterval(() => {
      this.verificarMudancaDeDia();
    }, 30000);
  }

  private executarMudancaDeDia(novoDia: string) {
    console.log(`O dia mudou de ${this.diaSalvo()} para ${novoDia}. Executando tarefa...`);
    this.diaSalvo.set(novoDia);
    this.localStorageService.set(this.STORAGE_KEY, novoDia);
    this.redefinirDadosDoApp();
  }

  private redefinirDadosDoApp() {
    this.dailyTasksService.resetAllTasks();
  }

  public obterDiaSalvo() {
    return this.diaSalvo.asReadonly();
  }
}
