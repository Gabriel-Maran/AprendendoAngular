import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderDefault } from './header-default';

describe('HeaderDefault', () => {
  let component: HeaderDefault;
  let fixture: ComponentFixture<HeaderDefault>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderDefault],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderDefault);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
