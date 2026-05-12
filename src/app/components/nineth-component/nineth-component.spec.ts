import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NinethComponent } from './nineth-component';

describe('NinethComponent', () => {
  let component: NinethComponent;
  let fixture: ComponentFixture<NinethComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NinethComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NinethComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
