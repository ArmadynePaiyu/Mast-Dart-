import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http';
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
import { GoalSeekComponent } from './section/goal-seek/goal-seek.component';
import { AnnouncementComponent } from './section/announcement/announcement.component';
import { HomepageComponent } from './homepage/homepage.component';
import {SharedService} from './providers/shared.service';
import { CustomisationPageComponent } from './customisation-page/customisation-page.component';

import { MetricGroupsComponent } from './customisation-page/metric-groups/metric-groups.component';
import { MetricFieldsComponent } from './customisation-page/metric-fields/metric-fields.component';
import { SelectedFieldsComponent } from './customisation-page/selected-fields/selected-fields.component';
import { RollOutComponent } from './section/roll-out/roll-out.component';
import { CurrentlevelComponent } from './section/currentlevel/currentlevel.component';
@NgModule({
  declarations: [
    AppComponent,
    Grid1Component,
    SectionComponent,
    MarginSummaryComponent,
    MarginDetailComponent,
    DealInfoComponent,
    SidenavComponent,
    GoalSeekComponent,
    AnnouncementComponent,
    HomepageComponent,
    CustomisationPageComponent,

    MetricGroupsComponent,
    MetricFieldsComponent,
    SelectedFieldsComponent,
    RollOutComponent,
    CurrentlevelComponent
  ],
  imports: [
    BrowserModule,
     HttpClientModule,
    AngularSlickgridModule.forRoot(),
     RouterModule.forRoot([
      {
        path: '',
        component: AnnouncementComponent,
      },
      {
        path: 'home',
        component:  HomepageComponent
      },
     /* {
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
      }*/
    ]) 
  ],
  providers: [SharedService],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
