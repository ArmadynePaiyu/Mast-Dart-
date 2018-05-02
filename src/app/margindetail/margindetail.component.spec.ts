import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MargindetailComponent } from './margindetail.component';

describe('MargindetailComponent', () => {
  let component: MargindetailComponent;
  let fixture: ComponentFixture<MargindetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MargindetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MargindetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
