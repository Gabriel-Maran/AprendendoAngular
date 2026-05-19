import { Injectable } from '@angular/core';
import { LocalStorage } from '../storage/local-storage';
import { Evento } from '../../models/Evento';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  STORAGE = 'eventos';
  eventos: Evento[] = [];

  constructor(private storage: LocalStorage) {
    this.eventos = this.storage.get(this.STORAGE) ?? [];
  }

  ngOnInit(): void {
    this.eventos = this.storage.get(this.STORAGE) ?? [];
  }

  getEventos(): Evento[] {
    return this.eventos;
  }

  getByTitle(title: string): Evento[] {
    const searchTitle = title.trim().toLowerCase();
    return this.eventos.filter((item) => item.titulo.toLowerCase().includes(searchTitle));
  }

  addEvent(task: Evento) {
    this.eventos.push(task);
    this.storage.set(this.STORAGE, this.eventos);
    console.log(task);
  }

  updateEvent(id: string, task: Evento) {
    task.id = id;
    this.eventos = this.eventos.map((item) => (item.id === id ? { ...task } : item));
    this.storage.set(this.STORAGE, this.eventos);
    return this.eventos;
  }

  getEvent(id: string) {
    return this.eventos.find((item) => item.id === id);
  }

  deleteEvent(id: string) {
    this.eventos = this.eventos.filter((item) => item.id != id);
    this.storage.set(this.STORAGE, this.eventos);
  }
}
