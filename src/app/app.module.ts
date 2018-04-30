import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AgGridModule} from 'ag-grid-angular/main';
import { HotTableModule } from 'ng2-handsontable';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import { AppComponent } from './app.component';
import { FilterComponentComponent } from './filter-component/filter-component.component';
import { ExcelComponent } from './excel/excel.component';
import { Grid1Component } from './grid1/grid1.component';
import 'slickgrid';
import 'jquery-ui';


@NgModule({
  declarations: [
    AppComponent,
    FilterComponentComponent,
    ExcelComponent,
    Grid1Component
  ],
  imports: [
    BrowserModule,
    HotTableModule,
    AgGridModule.withComponents([AppComponent]),
    AngularSlickgridModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
