import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenthComponent } from './tenth-component';

describe('TenthComponent', () => {
  let component: TenthComponent;
  let fixture: ComponentFixture<TenthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TenthComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TenthComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
