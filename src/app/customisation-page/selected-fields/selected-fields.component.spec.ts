import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedFieldsComponent } from './selected-fields.component';

describe('SelectedFieldsComponent', () => {
  let component: SelectedFieldsComponent;
  let fixture: ComponentFixture<SelectedFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectedFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectedFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
