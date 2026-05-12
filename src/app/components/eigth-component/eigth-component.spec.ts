import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EigthComponent } from './eigth-component';

describe('EigthComponent', () => {
  let component: EigthComponent;
  let fixture: ComponentFixture<EigthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EigthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EigthComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
