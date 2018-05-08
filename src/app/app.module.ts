import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { ExcelComponent } from './excel/excel.component';
import { Grid1Component } from './grid1/grid1.component';
import 'slickgrid';
import 'jquery-ui';
import { MenuComponent } from './menu/menu.component';
import { SectionComponent } from './section/section.component';
import { MarginSummaryComponent } from './section/margin-summary/margin-summary.component';
import { MarginDetailComponent } from './section/margin-detail/margin-detail.component';
import { DealViewComponent } from './section/deal-view/deal-view.component';
import { DealInfoComponent } from './section/deal-view/deal-info/deal-info.component';
import { UserregistrationComponent } from './userregistration/userregistration.component';
import { ConfirmComponent } from './userregistration/confirm/confirm.component';
import { SelfregistrationComponent } from './userregistration/selfregistration/selfregistration.component';
import { NewuserregistrationComponent } from './userregistration/newuserregistration/newuserregistration.component';
import { CountryPlselectionComponent } from './userregistration/country-plselection/country-plselection.component';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    ExcelComponent,
    Grid1Component,
    MenuComponent,
    SectionComponent,
    MarginSummaryComponent,
    MarginDetailComponent,
    DealViewComponent,
    DealInfoComponent,
    UserregistrationComponent,
    ConfirmComponent,
    SelfregistrationComponent,
    NewuserregistrationComponent,
    CountryPlselectionComponent
  ],
  imports: [
    BrowserModule,
    AngularSlickgridModule.forRoot()
  ],
  providers: [],
  bootstrap: [CountryPlselectionComponent]
})
export class AppModule { }
