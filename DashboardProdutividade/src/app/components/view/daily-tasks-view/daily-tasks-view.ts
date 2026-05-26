import { Component, inject, signal } from '@angular/core';
import { ModalDailyTasks } from '../../modal/modal-daily-tasks/modal-daily-tasks';
import { DailyTasks } from '../../../model/DailyTasks';
import { DailyTasksService } from '../../../services/daily-tasks/daily-tasks-service';

@Component({
  selector: 'app-daily-tasks-view',
  imports: [ModalDailyTasks],
  templateUrl: './daily-tasks-view.html',
  styleUrl: './daily-tasks-view.css',
})
export class DailyTasksView {
  dailyTasksService = inject(DailyTasksService);
  dailyTasksRaw = signal<DailyTasks[]>(
    this.dailyTasksService.getAll().sort((a, b) => Number(a.isDone) - Number(b.isDone)),
  );
  modalOpen = signal<boolean>(false);

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.atualizarLista();
  }

  completeTask(id: number) {
    this.dailyTasksService.doneDailyTask(id);
    this.atualizarLista();
  }

  private atualizarLista() {
    this.dailyTasksRaw.set(
      this.dailyTasksService.getAll().sort((a, b) => Number(a.isDone) - Number(b.isDone)),
    );
  }
}
