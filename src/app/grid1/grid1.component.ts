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
      /*{ id: "title", name: "Title", field: "title", formatter: toggleFormatter },
      { id: "amount", name: "Amount", field: "amount" ,editor: Slick.Editors.Text,hasTotal:true},
      { id: "weight", name: "Weight", field: "weight" ,editor: Slick.Editors.Text,hasTotal:true}*/
      { id: "checkBox", name: " ", field: "checkBox", },
      { id: "configNumber", name: "Cfg No", field: "configNumber" },
      { id: "prod", name: "Prod#", field: "prod" },
      { id: "opt", name: "Opt", field: "opt" },
      { id: "description", name: "Description", field: "description" },
      { id: "pi", name: "PI", field: "pi" },
      { id: "salesCountry", name: "Sales Ctry", field: "salesCountry" },
      { id: "prodQuantity", name: "Prod Quantity", field: "prodQuantity" },
      { id: "extendedNet", name: "Extended Net", field: "extendedNet" },
      { id: "avgList", name: "AVG List - SBSC", field: "avgList" },
      { id: "standardDiscount", name: "std Disc %", field: "standardDiscount" },
      { id: "discountPercent", name: "Disc %", field: "discountPercent",editor: Slick.Editors.Text },
      { id: "netPrice", name: "Net Price", field: "netPrice",editor: Slick.Editors.Text },
      { id: "netRevenue", name: "Net Revenue", field: "netRevenue" },
      { id: "grossMargin", name: "GM %", field: "grossMargin",editor: Slick.Editors.Text },
      { id: "variableProductionCostMargin", name: "VPM %", field: "variableProductionCostMargin",editor: Slick.Editors.Text },
      { id: "opertaingProfits", name: "OP %", field: "opertaingProfits",editor: Slick.Editors.Text },
      { id: "costOfSales", name: "COS" , field: "costOfSales" },
      { id: "distributorMarginPercent", name: "Distrib Margin %", field: "distributorMarginPercent",editor: Slick.Editors.Text },
      { id: "distributorMargin", name: "Distrib Margin", field: "distributorMargin" },
      { id: "resellerMarginPercent", name: "Reseller Margin %", field: "resellerMarginPercent",editor: Slick.Editors.Text },
      { id: "resellerMargin", name: "Reseller Margin", field: "resellerMargin" },
      { id: "endCustomerNetPricePercent", name: "End Cust Net Price %", field: "endCustomerNetPricePercent",editor: Slick.Editors.Text },
      { id: "endCustomerNetPrice", name: "End Cust Net Price", field: "endCustomerNetPrice" }
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
      data = [
      { configNumber: '001', prod: '766555-01', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1,954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%'},
      { configNumber: '001', prod: '766555-01', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1,954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%'},
      { configNumber: '001', prod: '766555-01', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1,954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%'}
      /*{ title: 'Ravi13', amount: '301,000.00', price: '34.41', weight: '3.3', indent: 2, parent: { id: 11 } },
      { title: 'Ravi14', amount: '-1,200.00', price: '26.07', weight: '2.2', indent: 2, parent: { id: 11 } },
      { title: 'Ravi15', amount: '0', price: '11.07', weight: '2.1', indent: 0, parent: null }*/]

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
