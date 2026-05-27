import { Component, inject, signal } from '@angular/core';
import { MissionsService } from '../../../services/missions/missions-service';
import { Mission } from '../../../model/Mission';
import { ModalMission } from '../../modal/modal-missions/modal-missions';

@Component({
  selector: 'app-missions-view',
  imports: [ModalMission],
  templateUrl: './missions-view.html',
  styleUrl: './missions-view.css',
})
export class MissionsView {
  missionsService = inject(MissionsService);

  missionsRaw = signal<Mission[]>(this.missionsService.getAll());
  modalOpen = signal<boolean>(false);

  openModal() {
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
    this.atualizarLista();
  }

  finalizarMission(id: number) {
    this.missionsService.doneMission(id);
    this.atualizarLista(); // Atualiza a lista após finalizar
  }

  private atualizarLista() {
    this.missionsRaw.set(this.missionsService.getAll());
  }
}
