import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Editing } from './editing';

describe('Editing', () => {
  let component: Editing;
  let fixture: ComponentFixture<Editing>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Editing],
    }).compileComponents();

    fixture = TestBed.createComponent(Editing);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
