import { Component, OnInit } from '@angular/core';
import { HotTableModule } from 'ng2-handsontable';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-excel',
  templateUrl: './excel.component.html',
  styleUrls: ['./excel.component.css']
})
export class ExcelComponent implements OnInit {

  constructor() { }

  ngOnInit() {
     var example1 = document.getElementById('example1');


  var sourceDataObject = [{
    category: 'ABC',
    artist: 'numbers 1',
    title: 1,
    label: 12,
    label2: 14,
    label22: 11,
    label24: 16,
    label26: 15,
    label28: 17,
    __children: [{
      artist: 'numbers 2',
      title: 2,
      label: 22,
      label2: 24,
      label22: 21,
      label24: 26,
      label26: 25,
      label28: 27,
    }, {
      artist: 'numbers 3',
      title: 3,
      label: 32,
      label2: 34,
      label22: 31,
      label24: 36,
      label26: 35,
      label28: 37,
    }]
  }, {
    category: 'ABC',
    artist: 'numbers 1',
    title: 1,
    label: 12,
    label2: 14,
    label22: 11,
    label24: 16,
    label26: 15,
    label28: 17,
    __children: [{
      artist: 'numbers 2',
      title: 2,
      label: 22,
      label2: 24,
      label22: 21,
      label24: 26,
      label26: 25,
      label28: 27,
    }, {
      artist: 'numbers 3',
      title: 3,
      label: 32,
      label2: 34,
      label22: 31,
      label24: 36,
      label26: 35,
      label28: 37,
    }]
  }];


  var hot = new Handsontable(example1, {
    data: sourceDataObject,
    colHeaders: true,
    rowHeaders: true,
    hiddenColumns: true,
    colWidths: 150,
    nestedHeaders: [
      ['A', {
        label: 'B',
        colspan: 8
      }, 'C'],
      ['D', {
        label: 'E',
        colspan: 4
      }, {
        label: 'F',
        colspan: 4
      }, 'G'],
      ['H', {
        label: 'I',
        colspan: 2
      }, {
        label: 'J',
        colspan: 2
      }, {
        label: 'K',
        colspan: 2
      }, {
        label: 'L',
        colspan: 2
      }, 'M'],
      ['N', 'O', 'P', 'Q', 'R', 'S', 'T', ' U', 'V', 'W']
    ],
    // nestedRows: true,
    collapsibleColumns: [{
      row: -4,
      col: 1,
      collapsible: true
    }, {
      row: -2,
      col: 3,
      collapsible: true
    }]
  });

  }

}
