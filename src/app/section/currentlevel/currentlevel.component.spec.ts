import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentlevelComponent } from './currentlevel.component';

describe('CurrentlevelComponent', () => {
  let component: CurrentlevelComponent;
  let fixture: ComponentFixture<CurrentlevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentlevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentlevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
