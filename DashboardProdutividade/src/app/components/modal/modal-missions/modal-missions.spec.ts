import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMissions } from './modal-missions';

describe('ModalMissions', () => {
  let component: ModalMissions;
  let fixture: ComponentFixture<ModalMissions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalMissions],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalMissions);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
