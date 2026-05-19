import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EventService } from '../../services/event/event-service';
import { Evento } from '../../models/Evento';
import { HomeView } from '../../components/events-view/home-view/home-view';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [RouterLink, HomeView, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  eventos: Evento[] = [];
  auxSearch: string = '';
  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventos = this.eventService.getEventos();
  }

  onSearch() {
    this.eventos = this.eventService.getByTitle(this.auxSearch);
  }
}
