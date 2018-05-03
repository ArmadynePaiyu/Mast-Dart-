import { Component, OnInit } from '@angular/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import 'slickgrid';
declare var Slick: any;
declare var TotalsPlugin: any;
declare var TotalsDataView: any;
@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.css']
})
export class Grid1Component implements OnInit {

  constructor() {
    var editFormatter=function(row, cell, value, columnDef, dataContext){
    //  console.log("row, cell, value, columnDef, dataContext"+ row+ cell+ value+ columnDef+ dataContext);
    }
    var toggleFormatter = function (row, cell, value, columnDef, dataContext) {
      value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
      var idx = dataView.getIdxById(dataContext.id);
      if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
        if (dataContext._collapsed) {
          return spacer + " <span class='toggle expand'>+</span>&nbsp;" + value;
        } else {
          return spacer + " <span class='toggle collapse'>-</span>&nbsp;" + value;
        }
      } else {
        return spacer + " <span class='toggle'></span>&nbsp;" + value;
      }
    };
    var dataView;
    var grid;
    var data = [];
    var columns = [
      { id: "title", name: "Title", field: "title", formatter: toggleFormatter },
      { id: "amount", name: "Amount", field: "amount" ,editor: Slick.Editors.Text,hasTotal:true},
      { id: "weight", name: "Weight", field: "weight" ,editor: Slick.Editors.Text,hasTotal:true}
    ];

    var options = {
      enableCellNavigation: true,
      forceFitColumns: true,
      enableColumnReorder: true,
      editable: true,
      autoEdit: true,
      asyncEditorLoading: true,
      selectable:true,
      sortable:true,
      createFooterRow: true,
     showFooterRow: true,
    footerRowHeight: 61
    };
 
    function myFilter(item) {

      if (item.parent != null) {
        var parent = data[item.parent.id];

        while (parent) {
          if (parent._collapsed) {
            return false;
          }
          parent = data[parent.parent ? parent.parent.id : null];

        }
      }

      return true;
    }
    
function UpdateAllTotals(grid1) {
    var columnIdx = grid1.getColumns().length;
    while (columnIdx--) {
      if(columnIdx!=0){
      UpdateTotal(columnIdx, grid1);
    }
    }
  }
  function UpdateTotal(cell, grid1) {
    var columnId = grid1.getColumns()[cell].id;
    
    var total = 0;
    var i = data.length;
    while (i--) {
      total += (parseInt(data[i][columnId], 10) || 0);
    }
    var columnElement = grid1.getFooterRowColumn(columnId);
    $(columnElement).html("Sum:  " + total);
  }


    $(function () {
      var indent = 0;
      data = [{ title: 'Ravi', amount: '', price: '', weight: '46.79', indent: 0, parent: null },
      { title: 'Ravi1', amount: '123456787', price: '55.90', weight: '-2.01', indent: 1, parent: { id: 0 } },
      { title: 'Ravi2', amount: '12,200.00', price: '0.39', weight: '1', indent: 1, parent: { id: 0 } },
      { title: 'Ravi3', amount: '301,000.00', price: '34.41', weight: '2', indent: 1, parent: { id: 0 } },
      { title: 'Ravi4', amount: '38,500.00', price: '27.59', weight: '1.3', indent: 1, parent: { id: 0 } },
      { title: 'Ravi5', amount: '', price: '', weight: '2.1', indent: 0, parent: null },
      { title: 'Ravi6', amount: '301,000.00', price: '0.39', weight: '4.6', indent: 1, parent: { id: 5 } },
      { title: 'Ravi7', amount: '-1,900.00', price: '27.59', weight: '1.3', indent: 1, parent: { id: 5 } },
      { title: 'Ravi8', amount: '', price: '', weight: '2.1', indent: 0, parent: null },
      { title: 'Ravi9', amount: '301,000.00', price: '34.41', weight: '3.3', indent: 1, parent: { id: 8 } },
      { title: 'Ravi10', amount: '-1,200.00', price: '26.07', weight: '2.2', indent: 1, parent: { id: 8 } },
      { title: 'Ravi11', amount: '', price: '', weight: '2.1', indent: 1, parent: { id: 8 } },
      { title: 'Ravi12', amount: '38,750.0', price: '23.70', weight: '4.6', indent: 2, parent: { id: 11 } },
      { title: 'Ravi13', amount: '301,000.00', price: '34.41', weight: '3.3', indent: 2, parent: { id: 11 } },
      { title: 'Ravi14', amount: '-1,200.00', price: '26.07', weight: '2.2', indent: 2, parent: { id: 11 } },
      { title: 'Ravi15', amount: '0', price: '11.07', weight: '2.1', indent: 0, parent: null }]

      var parents = [];

      // prepare the data
      for (var i in data) {
        var d = data[i];
        d['id'] = i
 for (var j = 0; j < columns.length; j++) {
        d[j] = Math.round(Math.random() * 10);
      }
        parents.push(d.parent ? d.parent['id'] : d.parent);
      }


      // initialize the model

      dataView = new Slick.Data.DataView();
      dataView.beginUpdate();
      dataView.setItems(data);
      dataView.setFilter(myFilter);
      dataView.endUpdate();
     // dataView.setAggregators([ new Slick.Data.Aggregators.Sum("value") ], false);

      // initialize the grid
      //var dataProvider = new TotalsDataView(dataView, columns);
      grid = new Slick.Grid("#myGrid", dataView, columns, options);
      // grid.setSelectionModel(new Slick.CellSelectionModel());
      console.log(grid);
       UpdateAllTotals(grid);
      // var totalsPlugin = new TotalsPlugin($.getScrollbarWidth());
      //       grid.registerPlugin(totalsPlugin);
      grid.onCellChange.subscribe(function (e, args) {
       UpdateTotal(args.cell, args.grid);
      });
      grid.onColumnsReordered.subscribe(function(e, args) {
      UpdateAllTotals(args.grid);
    }); 
var selectActiveRow =  false,selectedRows;

 grid.setSelectionModel(new Slick.RowSelectionModel({
            selectActiveRow: false
        }));
       grid.onClick.subscribe(function (e,args) {
            if ($(e.target).hasClass("toggle")) {
          var item = dataView.getItem(args.row);
          if (item) {
            if (!item._collapsed) {
              item._collapsed = true;
            } else {
              item._collapsed = false;
            }

            dataView.updateItem(item.id, item);
          }
          e.stopImmediatePropagation();
        } 
        //    if(selectActiveRow){
        //        if($.inArray(args.row, selectedRows) === -1){
        //            selectedRows = [];
        //            selectedRows.push(args.row)
        //        }else{
        //           selectedRows = []; 
        //        }
        //    }else{
        // ($.inArray(args.row, selectedRows) === -1) ? selectedRows.push(args.row) : selectedRows.splice(selectedRows.indexOf(args.row), 1);
        //         }
        // grid.setSelectedRows(selectedRows);
          
    });
    

      grid.onClick.subscribe(function (e, args) {
      
      });

      // wire up model events to drive the grid
      dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
        // totalsPlugin.render();
      });

      dataView.onRowsChanged.subscribe(function (e, args) {
        grid.invalidateRows(args.rows);
        grid.render();
        // totalsPlugin.render();
      });
    })
  }

  ngOnInit() {
  }

}
