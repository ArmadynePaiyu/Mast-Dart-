import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetricFieldsComponent } from './metric-fields.component';

describe('MetricFieldsComponent', () => {
  let component: MetricFieldsComponent;
  let fixture: ComponentFixture<MetricFieldsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetricFieldsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetricFieldsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
