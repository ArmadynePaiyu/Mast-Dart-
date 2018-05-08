import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewuserregistrationComponent } from './newuserregistration.component';

describe('NewuserregistrationComponent', () => {
  let component: NewuserregistrationComponent;
  let fixture: ComponentFixture<NewuserregistrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewuserregistrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewuserregistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
