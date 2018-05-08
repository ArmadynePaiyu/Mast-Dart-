import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryPlselectionComponent } from './country-plselection.component';

describe('CountryPlselectionComponent', () => {
  let component: CountryPlselectionComponent;
  let fixture: ComponentFixture<CountryPlselectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CountryPlselectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CountryPlselectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
