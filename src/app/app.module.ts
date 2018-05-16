import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { Grid1Component } from './grid1/grid1.component';
import 'slickgrid';
import 'jquery-ui';
import { SectionComponent } from './section/section.component';
import { MarginSummaryComponent } from './section/margin-summary/margin-summary.component';
import { MarginDetailComponent } from './section/margin-detail/margin-detail.component';
import { DealInfoComponent } from './section/deal-info/deal-info.component';
import { SidenavComponent } from './section/sidenav/sidenav.component';


@NgModule({
  declarations: [
    AppComponent,
    Grid1Component,
    SectionComponent,
    MarginSummaryComponent,
    MarginDetailComponent,
    DealInfoComponent,
    SidenavComponent
  ],
  imports: [
    BrowserModule,
    AngularSlickgridModule.forRoot(),
    /* RouterModule.forRoot([
      {
        path: 'selfReg',
        component: SelfregistrationComponent
      },
      {
        path: 'newUserReg',
        component: NewuserregistrationComponent
      },
      {
        path: 'country',
        component: CountryPlselectionComponent
      },
      {
        path: 'prodLines',
        component: CountryPlselectionComponent
      },
      {
        path: 'summary',
        component: ConfirmComponent
      },
      {
        path: 'confirm',
        component: ConfirmComponent
      }
    ]) */
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
