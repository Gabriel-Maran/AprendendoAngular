import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MissionsView } from './missions-view';

describe('MissionsView', () => {
  let component: MissionsView;
  let fixture: ComponentFixture<MissionsView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MissionsView],
    }).compileComponents();

    fixture = TestBed.createComponent(MissionsView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
