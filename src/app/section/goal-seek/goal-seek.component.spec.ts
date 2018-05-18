import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalSeekComponent } from './goal-seek.component';

describe('GoalSeekComponent', () => {
  let component: GoalSeekComponent;
  let fixture: ComponentFixture<GoalSeekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GoalSeekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalSeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
