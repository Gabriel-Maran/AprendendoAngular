import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Camara } from './camara';

describe('Camara', () => {
  let component: Camara;
  let fixture: ComponentFixture<Camara>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Camara],
    }).compileComponents();

    fixture = TestBed.createComponent(Camara);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
