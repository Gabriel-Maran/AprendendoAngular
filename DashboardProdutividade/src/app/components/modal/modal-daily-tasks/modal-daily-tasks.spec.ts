import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDailyTasks } from './modal-daily-tasks';

describe('ModalDailyTasks', () => {
  let component: ModalDailyTasks;
  let fixture: ComponentFixture<ModalDailyTasks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDailyTasks],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalDailyTasks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
