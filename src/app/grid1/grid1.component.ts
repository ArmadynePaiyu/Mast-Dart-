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
  gridCopy;
  constructor() {
    var columnsWithHighlightingById = {};
    var editFormatter=function(row, cell, value, columnDef, dataContext){
     console.log("row, cell, value, columnDef, dataContext"+ row+ cell+ value+ columnDef+ dataContext);
    return " <div style='color:#9eefc8'></div>&nbsp;"; 
  }
    function requiredFieldValidator(value) {
    if (value == null || value == undefined || !value.length || value <= 0) {
      return {valid: false, msg: "This is a required field"};
    } else {
      return {valid: true, msg: null};
    }
  }
  function highlightingFormatter(row, cell, value, columnDef, dataContext) {
    if (columnsWithHighlightingById[columnDef.id]) {
      return "<div style='color:#eff2f7; font-weight:bold;'>" + value + "</div>";
    } else {
      return value;
    }
  }
    var toggleFormatter = function (row, cell, value, columnDef, dataContext) {
      value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
      var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
      var idx = dataView.getIdxById(dataContext.id);
      if (data[idx + 1] && data[idx + 1].indent > data[idx].indent) {
        if (dataContext._collapsed) {
          return spacer + " <span class='toggle expand' style='font-size:large'>+</span>" + value;
        } else {
          return spacer + " <span class='toggle collapse' style='font-size:large'>-</span>" + value;
        }
      } else {
        return spacer + " <span class='toggle'></span>&nbsp;" + value;
      }
    };
    var dataView;
    var grid;
    var data = [];
    var checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
      });
       var columns=[];
     // columns.push(checkboxSelector.getColumnDefinition());
    var columnsDef = [
      /*{ id: "title", name: "Title", field: "title", formatter: toggleFormatter },
      { id: "amount", name: "Amount", field: "amount" ,editor: Slick.Editors.Text,hasTotal:true},
      { id: "weight", name: "Weight", field: "weight" ,editor: Slick.Editors.Text,hasTotal:true}*/
      // { id: "checkBox", name: "<input type='checkbox'> ", field: "checkBox"},
      // { id: "Toggle", name: " Toggle", field: "" ,formatter: toggleFormatter },
      { id: "configNumber", name: "Active", field: "configNumber"  },
      { id: "prod", name: "Line#", field: "prod" },
      { id: "opt", name: "Notes", field: "opt" },
      { id: "description", name: "Line type", field: "description" },
      { id: "pi", name: "Qty", field: "pi" },
      { id: "salesCountry", name: "Product Number", field: "salesCountry"},
      { id: "prodQuantity", name: "Opt cd", field: "prodQuantity",formatter: highlightingFormatter,header: {buttons: [{cssClass: "icon-highlight-off",command: "toggle-highlight",tooltip: "Include"}]} },
      { id: "extendedNet", name: "MCC", field: "extendedNet" },
      { id: "avgList", name: "Description", field: "avgList" },
      { id: "standardDiscount", name: "List price", field: "standardDiscount" },
      { id: "discountPercent", name: "Total Disc %", field: "discountPercent",cssClass:"editable",editor: Slick.Editors.Text},
      { id: "netPrice", name: "Gross Margin%", field: "netPrice",cssClass:"editable",editor: Slick.Editors.Text,validator: requiredFieldValidator }/*,
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
      { id: "endCustomerNetPrice", name: "End Cust Net Price", field: "endCustomerNetPrice" }*/
    ];
    for(var i=0;i<columnsDef.length;i++){
      if(i==0){
        columns.push({id: "title", name: "Title", field: "title", formatter: toggleFormatter})
      columns.push(checkboxSelector.getColumnDefinition());
      }
      columns.push(columnsDef[i]);
    }
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
  //columns[1].name = "<input type='checkbox'></input>";
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
    
function UpdateAllTotals(grid1,selectedRows) {
    var columnIdx = grid1.getColumns().length;
    while (columnIdx--) {
      if(columnIdx!=0){
      UpdateTotal(columnIdx, grid1,selectedRows);
    }
    }
  }
  function UpdateTotal(cell, grid1,selectedRows) {
      var  total = 0, columnId = grid1.getColumns()[cell].id;
    if(selectedRows!=null){
    
    
    var i = selectedRows.length;
   
    while (i--) {
           if(columnId=="discountPercent"){
           total += (parseInt(data[selectedRows[i]][columnId], 10) || 0);
           
          }
          else{
      total += (parseInt(data[selectedRows[i]][columnId], 10) || 0);
      console.log(data[selectedRows[i]][columnId]+"value");
          }
    }
    var columnElement = grid1.getFooterRowColumn(columnId);
    $(columnElement).html("Sum:  " + total);
  }
 else{
    var columnElement = grid1.getFooterRowColumn(columnId);
    $(columnElement).html("Sum: "+total);
 }
  }
   

var dataContainer = {};
    $(function () {
      var indent = 0;
      data = [
      { title:'',configNumber: '7103129949-01', prod: '7103129949-01', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1,954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 0, parent: null},
      {title:'', configNumber: '001', prod: '818208-B21', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 1, parent: { id: 0 }},
      { title:'',configNumber: '001', prod: '805349-B21', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 1, parent: { id: 0 }},
      { title:'',configNumber: '001', prod: 'H1K92A3', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 1, parent: { id: 0 }},
      { title:'',configNumber: '001', prod: 'H1K92A3', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 2, parent: { id: 3 }},
      { title:'',configNumber: '001', prod: 'HA114A1', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 1, parent: { id: 0 }},
      { title:'',configNumber: '001', prod: 'HA114A1', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 2, parent: { id: 5  }},
      { title:'',configNumber: '001', prod: 'HF385A1', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 1, parent: { id: 0 }},
      { title:'',configNumber: '001', prod: 'BW900AR', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 0, parent: null},
      {title:'', configNumber: '001', prod: 'U2SM4E', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 0, parent: null},
      { title:'',configNumber: '001', prod: 'BW900AR', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 0, parent: null},
      { title:'',configNumber: '001', prod: 'U2SM4E', opt: '', description: 'HPE 455665 server', pi: 'SY', salesCountry: 'US',prodQuantity:'5', extendedNet:'449',avgList:'1954',standardDiscount:'0.00%',discountPercent:'75.00%',netPrice:'449',netRevenue:'449',grossMargin:'100%',variableProductionCostMargin:'20.00',opertaingProfits:'10.00',costOfSales:'113',distributorMarginPercent:'678',distributorMargin:'30.00%',resellerMarginPercent:'15.00%',resellerMargin:'22.00%',endCustomerNetPricePercent:'5.00%',endCustomerNetPrice:'7.00%',indent: 0, parent: null}
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
      //checkbox selction for each row
         

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
    
      var headerButtonsPlugin = new Slick.Plugins.HeaderButtons();
    headerButtonsPlugin.onCommand.subscribe(function(e, args) {
      var column = args.column;
      var button = args.button;
      var command = args.command;
      if (command == "toggle-highlight") {
        if (button.cssClass == "icon-highlight-on") {
          delete columnsWithHighlightingById[column.id];
          button.cssClass = "icon-highlight-off";
          button.tooltip = "Include"
        } else {
          columnsWithHighlightingById[column.id] = true;
          button.cssClass = "icon-highlight-on";
          button.tooltip = "exclude"
        }
        grid.invalidate();
      }
     });
    grid.registerPlugin(headerButtonsPlugin);
      console.log(columns);
       grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false}));
    grid.registerPlugin(checkboxSelector);

    var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);

    var context = {};
       grid.onMouseEnter.subscribe(function (evt, args) {
        var cell = grid.getCellFromEvent(evt)
        context["rowIndex"] = cell.row;
        context["row"] = grid.getDataItem(cell.row);
    })
    
     grid.onValidationError.subscribe(function(e, args) {
        //console.log("Validation error");
                if(args.rowFailures){
                 var rowsIndexValues = Object.keys(args.rowFailures);
                 for(var i in rowsIndexValues) {
                    var rowFailures = args.rowFailures[rowsIndexValues[i]]
                    
                    for(var j in rowFailures){
                      var failure = rowFailures[j];
        //scroll first failure into view
                      // if( i==0){grid.scrollRowIntoView(failure.rowIndex)}
                      grid.flashCell(failure.rowIndex, failure.columnIndex, 500);
                    }
                }
                }
            });

    grid.onMouseLeave.subscribe(function (evt, args) {
        context = {}
    })
    var selectedRows;
//     grid.setCellCssStyles("birthday_highlight", {
//    0: {
//         netPrice: "editable", 
//         opt: "editable" 
//        },

//    9: {
//          netPrice: "editable",
//          opt: "editable"
//        }
// })
    // grid.updateColumnHeader(myhtml,{

    // })
 
     grid.onSelectedRowsChanged.subscribe(function (evt, args) {
      

        console.log(args.grid.getSelectedRows());
        var selectedRows=args.grid.getSelectedRows();
        UpdateAllTotals(args.grid,selectedRows);
        // if (!context["row"]) {
        //     var rows = grid.getData();
        //     for (var r in rows) {
        //         var row = rows[r]
        //         for (var i = 1; i < columns.length; ++i) {
        //             // row[i] = args.rows.length == 0 ? '' : dataContainer[r][i]
        //         }
        //     }
        //     grid.invalidateAllRows();
        // } else {
        //     var display = args.rows.indexOf(context["rowIndex"]) >= 0;

        //     for (i = 1; i < columns.length; ++i) {
        //         context["row"][i] = display ? dataContainer[context["rowIndex"][i]] : ''
        //     }

        //     grid.invalidateRow(context["rowIndex"]);
        // }
 grid.invalidateRows(args.rows);
 
    // grid.render();
        grid.render();
    })

      // grid.setSelectionModel(new Slick.CellSelectionModel());
      console.log(grid);
       UpdateAllTotals(grid,selectedRows);
      // var totalsPlugin = new TotalsPlugin($.getScrollbarWidth());
      //       grid.registerPlugin(totalsPlugin);
      grid.onCellChange.subscribe(function (e, args) {
      //    var cell = grid.getCellFromEvent(e),
      //       param = {},
      //       columnCss = {},
      //     columns1=[10,11];
      //     for(var index=0; index < columns1.length;index++){
      //         var id = columns[columns1[index]].id;
      //         columnCss[id] = 'editable'
      //     }
      //     param[args.row] = columnCss;
      //     args.grid.setCellCssStyles("editable", param);
      //  UpdateTotal(args.cell, args.grid,selectedRows);
        grid.invalidateRows(args.rows);
        grid.render();
      });
      grid.onColumnsReordered.subscribe(function(e, args) {

      UpdateAllTotals(args.grid,selectedRows);
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
    });
        
    
//       grid.onClick.subscribe(function (e, args) {
//         grid.setCellCssStyles("birthday_highlight", {
//    0: {
//         netPrice: "editable", 
//         opt: "editable" 
//        },

//    9: {
//          netPrice: "editable",
//          opt: "editable"
//        }
// })
//       });

      // wire up model events to drive the grid
      dataView.onRowCountChanged.subscribe(function (e, args) {
        grid.updateRowCount();
        grid.render();
        
      });

      dataView.onRowsChanged.subscribe(function (e, args) {
     
        grid.invalidateRows(args.rows);
        grid.render();
        
      });
    })
  }

  ngOnInit() {
  }
  setGrid(gridData){
    this.gridCopy = gridData;
  };
  public selectAll(){
    console.log('Called successfully');
      var rows = [];
          for (var i = 0; i < this.gridCopy.getDataLength(); i++) {
              rows.push(i);
          }
          //Set selected rows on grid
          this.gridCopy.setSelectedRows(rows);
  }

}
