import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HabitosView } from './habitos-view';

describe('HabitosView', () => {
  let component: HabitosView;
  let fixture: ComponentFixture<HabitosView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HabitosView],
    }).compileComponents();

    fixture = TestBed.createComponent(HabitosView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
