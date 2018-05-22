import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../providers/shared.service';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  constructor(private shared:SharedService) { }

  ngOnInit() {
  }
  collapseAll(){
    console.log(this.shared.getDataView());
    let dataView = this.shared.getDataView();
    dataView.collapseGroup();
  }
  selectAll(){
    debugger;
     let rows = [];
     let grid = this.shared.getMarginDetailsGrid();
          for (let i = 0; i < grid.getDataLength(); i++) {
              rows.push(i);
          }
          //Set selected rows on grid
          grid.setSelectedRows(rows);
  }

  unselectAll(){
    let grid = this.shared.getMarginDetailsGrid();
     grid.setSelectedRows([]);
  }
}
