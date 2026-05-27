import { Component } from '@angular/core';
import { HeaderDefault } from '../../components/header-default/header-default';
import { BarItens } from '../../model/BarItens';
import { ComprasView } from '../../components/view/compras-view/compras-view';
import { HabitosView } from '../../components/view/habitos-view/habitos-view';
import { DailyTasksView } from '../../components/view/daily-tasks-view/daily-tasks-view';
import { MissionsView } from '../../components/view/missions-view/missions-view';

@Component({
  selector: 'app-home',
  imports: [HeaderDefault, ComprasView, HabitosView, DailyTasksView, MissionsView],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  selectedBar: BarItens = 'HABITOS';

  switchBar(to: BarItens) {
    this.selectedBar = to;
  }
}
