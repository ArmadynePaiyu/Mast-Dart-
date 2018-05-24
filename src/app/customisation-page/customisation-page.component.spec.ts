import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomisationPageComponent } from './customisation-page.component';

describe('CustomisationPageComponent', () => {
  let component: CustomisationPageComponent;
  let fixture: ComponentFixture<CustomisationPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomisationPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomisationPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
