import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DailyTasksView } from './daily-tasks-view';

describe('DailyTasksView', () => {
  let component: DailyTasksView;
  let fixture: ComponentFixture<DailyTasksView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DailyTasksView],
    }).compileComponents();

    fixture = TestBed.createComponent(DailyTasksView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
