import { Component, inject, input, OnInit } from '@angular/core';
import { EventService } from '../../../services/event/event-service';
import { Evento } from '../../../models/Evento';
import { CurrencyFormatPipe } from '../../../pipes/currency/currency-format-pipe';
import { DateFormatPipe } from '../../../pipes/dateFormat/date-format-pipe';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-view',
  imports: [CurrencyFormatPipe, DateFormatPipe],
  templateUrl: './home-view.html',
  styleUrl: './home-view.css',
})
export class HomeView {
  private router = inject(Router);
  eventos = input<Evento[]>([]);
  navegar(id: number | string) {
    this.router.navigate(['/event', id]);
  }
}
