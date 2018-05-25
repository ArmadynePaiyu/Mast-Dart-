import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RolloutComponent } from './rollout.component';

describe('RolloutComponent', () => {
  let component: RolloutComponent;
  let fixture: ComponentFixture<RolloutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RolloutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RolloutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
