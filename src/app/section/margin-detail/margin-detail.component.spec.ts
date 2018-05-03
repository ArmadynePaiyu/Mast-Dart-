import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarginDetailComponent } from './margin-detail.component';

describe('MarginDetailComponent', () => {
  let component: MarginDetailComponent;
  let fixture: ComponentFixture<MarginDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarginDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarginDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
