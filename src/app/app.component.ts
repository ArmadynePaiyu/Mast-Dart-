import { Component } from '@angular/core';
import { HotTableModule } from 'ng2-handsontable';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
   columnDefs = [
   { headerName: "Roll No", field: "RollNo", editable: true },
   { headerName: "Name", field: "Name", editable: true },
   { headerName: "Place", field: "PlaceName", editable: true },
   { headerName: "Birth Date", field: "dob", editable: true }
];rowData=["asd","asdas","asdasfa"];


    // objectData = [
    //   {id: 1, name: 'Ted Right', address: ''},
    //   {id: 2, name: 'Frank Honest', address: ''},
    //   {id: 3, name: 'Joan Well', address: ''},
    //   {id: 4, name: 'Gail Polite', address: ''},
    //   {id: 5, name: 'Michael Fair', address: ''},
    // ];
  //   container3 = document.getElementById('example3');
  //   hot3:any;

  // hot3 = new Handsontable(container3, {
  //   data: objectData,
  //   colHeaders: true,
  //   minSpareRows: 1
  // });
}
