import { Injectable, OnInit } from '@angular/core';
import { LocalStorage } from '../storage/local-storage';
import { Task } from '../../models/Task';

@Injectable({
  providedIn: 'root',
})
export class TaskService implements OnInit {
  tasks: Task[] = [];

  constructor(private storage: LocalStorage) {
    this.tasks = this.storage.get('tasks') ?? [];
  }

  ngOnInit(): void {
    this.tasks = this.storage.get('tasks') ?? [];
  }

  addNewTask(task: Task) {
    this.tasks.push(task);
    console.log(this.tasks);
    this.storage.set('tasks', this.tasks);
  }

  doneTask(id: string) {
    this.tasks = this.tasks.map((item) =>
      item.id === id ? { ...item, isDone: !item.isDone } : item,
    );
    this.storage.set('tasks', this.tasks);
    return this.tasks;
  }

  updateTask(id: string, task: Task) {
    task.id = id;
    this.tasks = this.tasks.map((item) => (item.id === id ? { ...task } : item));
    this.storage.set('tasks', this.tasks);
    return this.tasks;
  }

  getTask(id: string) {
    return this.tasks.find((item) => item.id === id);
  }

  deleteTask(id: string) {
    this.tasks = this.tasks.filter((item) => item.id != id);
    this.storage.set('tasks', this.tasks);
  }
}
