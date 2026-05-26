import { Component, inject, signal } from '@angular/core';
import { ModalHabitos } from '../../modal/modal-habitos/modal-habitos';
import { HabitosService } from '../../../services/habitos/habitos-service';
import { Habitos } from '../../../model/Habitos';

@Component({
  selector: 'app-habitos-view',
  imports: [ModalHabitos],
  templateUrl: './habitos-view.html',
  styleUrl: './habitos-view.css',
})
export class HabitosView {
  habitosService = inject(HabitosService);
  habitosRaw = signal<Habitos[]>(
    this.habitosService.getAll().sort((a, b) => Number(b.isGood) - Number(a.isGood)),
  );
  modalOpen = signal<boolean>(false);

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.atualizarLista();
  }

  use(id: number) {
    this.habitosService.useHabito(id);
  }

  private atualizarLista() {
    this.habitosRaw.set(
      this.habitosService.getAll().sort((a, b) => Number(b.isGood) - Number(a.isGood)),
    );
  }
}
