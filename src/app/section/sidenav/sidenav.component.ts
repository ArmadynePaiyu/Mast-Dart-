import { Component, OnInit } from '@angular/core';
import {SharedService} from '../../providers/shared.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
 //grid = this.shared.getMarginDetailsGrid();
  constructor(private shared:SharedService) { 
    //var grid = this.shared.getMarginDetailsGrid();
  }

  ngOnInit() {
  }
  collapseAll(){
    console.log(this.shared.getDataView());
    let dataView = this.shared.getDataView();
    let grid = this.shared.getMarginDetailsGrid();
    let data=this.shared.getData();
    console.log(data);
            var leng = dataView.getLength() 

                                for(var i = 0; i < leng;i++){ 
                                        var item = dataView.getItem(i); 
                    if (item) { 
                        if (!item._collapsed) 
                            item._collapsed = true; 
                        else 
                            item._collapsed = true; 

                    } 
    //dataView.collapseGroup();
    dataView.refresh();
    console.log("qwerty");
    ;
  }
  grid.invalidate();
  grid.render();
}
 expandAll(){
    console.log(this.shared.getDataView());
    let dataView = this.shared.getDataView();
    let grid = this.shared.getMarginDetailsGrid();
    let data=this.shared.getData();
    console.log(" expand");
            var leng = dataView.getLength() 

                                for(var i = 0; i < leng;i++){ 
                                        var item = dataView.getItem(i); 
                    if (item) { 
                        if (!item._collapsed) 
                            item._collapsed = false; 
                        else 
                            item._collapsed = false; 

                    } 
    //dataView.collapseGroup();
    dataView.refresh();
  }
   grid.invalidate();
  grid.render();
  }
  selectAll(){
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
     console.log("service");
     var demo=this.shared.getMarginDetailsData();
    console.log(demo);
  }
}
