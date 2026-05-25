import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalReward } from './modal-reward';

describe('ModalReward', () => {
  let component: ModalReward;
  let fixture: ComponentFixture<ModalReward>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalReward],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalReward);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
