import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalHabitos } from './modal-habitos';

describe('ModalHabitos', () => {
  let component: ModalHabitos;
  let fixture: ComponentFixture<ModalHabitos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalHabitos],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalHabitos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
