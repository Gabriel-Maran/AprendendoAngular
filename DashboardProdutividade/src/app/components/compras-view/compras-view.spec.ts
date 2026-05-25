import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprasView } from './compras-view';

describe('ComprasView', () => {
  let component: ComprasView;
  let fixture: ComponentFixture<ComprasView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComprasView],
    }).compileComponents();

    fixture = TestBed.createComponent(ComprasView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
