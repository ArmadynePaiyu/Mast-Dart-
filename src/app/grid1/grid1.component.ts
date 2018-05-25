import { Component, OnInit } from '@angular/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import 'slickgrid';
import {SharedService} from '../providers/shared.service';
declare var Slick: any;
declare var TotalsPlugin: any;
declare var TotalsDataView: any;

// var $ = require('jQuery');

@Component({
  selector: 'app-grid1',
  templateUrl: './grid1.component.html',
  styleUrls: ['./grid1.component.css']
})
export class Grid1Component implements OnInit {
  gridCopy;
  columnsWithHighlightingById = {};
  marginDetailsDataView;
  grid;
  data = [];
  marginDetailsRes=[];
  columns=[];
  columnsDef;
  columnsDef1;
  dataContainer;

  constructor(private shared:SharedService) {
 
  };

  
  editFormatter (row, cell, value, columnDef, dataContext){
      return " <div style='color:#9eefc8'></div>&nbsp;"; 
  };

  requiredFieldValidator(value) {
      if (value == null || value == undefined || !value.length || value <= 0) {
        return {valid: false, msg: "This is a required field"};
      } else {
        return {valid: true, msg: null};
      }
    };

    myFilter(item) {
      console.log(this);
      if (item.parent != null) {
        var parent = this.data[item.parent.id];
        while (parent) {
          if (parent._collapsed) {
            return false;
          }
          parent = this.data[parent.parent ? parent.parent.id : null];
        }
      }
      return true;
    };

    UpdateAllTotals(grid1,selectedRows) {
      let columnIdx = grid1.getColumns().length;
      while (columnIdx--) {
        if(columnIdx!=0){
        this.UpdateTotal(columnIdx, grid1,selectedRows);
      }
      }
    };

  UpdateTotal(cell, grid1,selectedRows) {
    var  total = 0, columnId = grid1.getColumns()[cell].id;
    if(selectedRows!=null){
      var i = selectedRows.length;   
      while (i--) {
            if(columnId=="discountPercent"){
            total += (parseInt(this.data[selectedRows[i]][columnId], 10) || 0);           
            }
            else{
        total += (parseInt(this.data[selectedRows[i]][columnId], 10) || 0);
            }
      }
      var columnElement = grid1.getFooterRowColumn(columnId);
      $(columnElement).html("Sum:  " + total);
    }
    else{
        var columnElement = grid1.getFooterRowColumn(columnId);
        $(columnElement).html("Sum: "+total);
    }
  };


  getFormatter(data){
    let ret : any;
    switch (data) {
      case "productNotesFormatter":
        ret = this.productNotesFormatter;
        break;
      case "highlightingFormatter":
        ret = this.highlightingFormatter;
        break;
      case "toggleFormatter":
        ret = this.toggleFormatter;
        break;    
      default:
        break;
    }
    return ret;
  }

  productNotesFormatter (row, cell, value, columnDef, dataContext) {
       return  " <div data-toggle='modal' data-target='#productNotes'>"+ value+"</div>" ;
  };

  highlightingFormatter(row, cell, value, columnDef, dataContext) {
    if (this.columnsWithHighlightingById[columnDef.id]) {
      return "<div style='color:#eff2f7; font-weight:bold;'>" + value + "</div>";
    } else {
      return value;
    }
  };
    
  toggleFormatter (row, cell, value, columnDef, dataContext) {
    value = value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
    var spacer = "<span style='display:inline-block;height:1px;width:" + (15 * dataContext["indent"]) + "px'></span>";
    var idx = this.marginDetailsDataView.getIdxById(dataContext.id);

    if (this.data[idx + 1] && this.data[idx + 1].indent > this.data[idx].indent) {
      if (dataContext._collapsed) {
        return spacer + " <span class='toggle expand' style='font-size:large;display: inline-block !important;'>+</span>" + value;
      } else {
        return spacer + " <span class='toggle collapse' style='font-size:large;display: inline-block !important;'>-</span>" + value;
      }
    } else {
      return spacer + " <span class='toggle'></span>&nbsp;" + value;
    }
  };

  ngOnInit() {    
    
    let checkboxSelector = new Slick.CheckboxSelectColumn({
        cssClass: "slick-cell-checkboxsel"
      });

    this.columns.push(checkboxSelector.getColumnDefinition());
      
    this.columnsDef1 = [
      { id: "lineNr", name: "lineNr", field: "lineNr" ,order:1 ,"serialNo":5},
      { id: "notes", name: "notes", field: "notes",formatter: "productNotesFormatter",order:2 },
      { id: "prodType", name: "prodType", field: "prodType",order:3 },
      { id: "qty", name: "qty", field: "qty",order:8 },
      { id: "congfigName", name: "congfigName", field: "congfigName",order:4},
      { id: "prodOptCD", name: "prodOptCD", field: "prodOptCD"},
      { id: "mccCD", name: "mccCD", field: "mccCD",formatter: "highlightingFormatter",header: {buttons: [{cssClass: "icon-highlight-off",command: "toggle-highlight",tooltip: "Include"}]} },
      { id: "prodDesc", name: "prodDesc", field: "prodDesc" },
      { id: "prodLine", name: "prodLine", field: "prodLine" },
      { id: "listPrice", name: "listPrice", field: "listPrice" },
      { id: "totalCostPrice", name: "totalCostPrice", field: "totalCostPrice",cssClass:"editable",editor: Slick.Editors.Integer},
      { id: "netPrice", name: "netPrice", field: "netPrice",cssClass:"editable",editor: Slick.Editors.Integer,validator: "requiredFieldValidator" },
      { id: "stdDiscPct", name: "stdDiscPct", field: "stdDiscPct" },
      { id: "addlDiscPct", name: "addlDiscPct", field: "addlDiscPct",editor: Slick.Editors.Text },
      { id: "totalDiscPct", name: "totalDiscPct", field: "totalDiscPct",editor: Slick.Editors.Text },
      { id: "totalDisc", name: "totalDisc", field: "totalDisc",editor: Slick.Editors.Text },
      { id: "grossMargin", name: "grossMargin" , field: "grossMargin" },
      { id: "grossMarginPct", name: "grossMarginPct", field: "grossMarginPct",editor: Slick.Editors.Text }/*,
      { id: "distributorMargin", name: "Distrib Margin", field: "distributorMargin" },,formatter: productNotesFormatter
      { id: "resellerMarginPercent", name: "Reseller Margin %", field: "resellerMarginPercent",editor: Slick.Editors.Text },
      { id: "resellerMargin", name: "Reseller Margin", field: "resellerMargin" },
      { id: "endCustomerNetPricePercent", name: "End Cust Net Price %", field: "endCustomerNetPricePercent",editor: Slick.Editors.Text },
      { id: "endCustomerNetPrice", name: "End Cust Net Price", field: "endCustomerNetPrice" }*/
    ];

     for(var i=0;i<this.columnsDef1.length;i++){
       if(i==0){
        this.columns.push({id: "title", name: "Title", field: "title", formatter: this.toggleFormatter})
      }
      this.columnsDef1[i].formatter = this.getFormatter(this.columnsDef1[i].formatter);
      this.columns.push(this.columnsDef1[i]);
     }
    let options = {
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
    
      this.shared.getMarginDetailsData().subscribe(dataRes =>{
      this.data=dataRes;
      this.marginDetailsRes = dataRes;
      this.shared.setMarginDetailsRes(this.marginDetailsRes);
      this.shared.getMarginDetailsColumnData().subscribe(colHeaders =>{
      let dumArr = [];
      let indent = 0;
      let parents = [];
      this.marginDetailsDataView = new Slick.Data.DataView();
      this.marginDetailsDataView.beginUpdate();
      this.marginDetailsDataView.setItems(this.shared.getMarginDetailsRes());
      this.marginDetailsDataView.setFilter(this.myFilter);
      this.marginDetailsDataView.endUpdate();
      this.grid = new Slick.Grid("#myGrid", this.marginDetailsDataView, this.columns, options);
    
      let headerButtonsPlugin = new Slick.Plugins.HeaderButtons();
      headerButtonsPlugin.onCommand.subscribe((e, args)  =>{
      var column = args.column;
      var button = args.button;
      var command = args.command;
      if (command == "toggle-highlight") {
        if (button.cssClass == "icon-highlight-on") {
          delete this.columnsWithHighlightingById[column.id];
          button.cssClass = "icon-highlight-off";
          button.tooltip = "Include"
        } else {
          this.columnsWithHighlightingById[column.id] = true;
          button.cssClass = "icon-highlight-on";
          button.tooltip = "exclude"
        }
        this.grid.invalidate();
      }
     });
    this.grid.registerPlugin(headerButtonsPlugin);
    this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow:false}));
    this.grid.registerPlugin(checkboxSelector);
    let columnpicker = new Slick.Controls.ColumnPicker(this.columns, this.grid, options);

    let context = {};
       this.grid.onMouseEnter.subscribe(function (evt, args) {
        let cell = this.grid.getCellFromEvent(evt)
        context["rowIndex"] = cell.row;
        context["row"] = this.grid.getDataItem(cell.row);
    })
    
     this.grid.onValidationError.subscribe((e, args) => {
          if(args.rowFailures){
            let rowsIndexValues = Object.keys(args.rowFailures);
            for(let i in rowsIndexValues) {
              var rowFailures = args.rowFailures[rowsIndexValues[i]]
              
              for(let j in rowFailures){
                let failure = rowFailures[j];
                this.grid.flashCell(failure.rowIndex, failure.columnIndex, 500);
              }
          }
          }
      });

    this.grid.onMouseLeave.subscribe((evt, args) => {
        context = {}
    })
     let selectedRows;
 
     this.grid.onSelectedRowsChanged.subscribe((evt, args) => {
        let selectedRows=args.grid.getSelectedRows();
        this.UpdateAllTotals(args.grid,selectedRows);
        this.grid.invalidateRows(args.rows);
        this.grid.render();
    })
    this.UpdateAllTotals(this.grid,selectedRows);

      this.grid.onCellChange.subscribe((e, args) => { 
       let row=this.data[args.row];
       let columnId=this.columns[args.cell].id;
       let value=this.marginDetailsRes[args.row][columnId];
         this.shared.getCalculatedDetailsData(row,columnId,value).subscribe(res=>{
           let updatedRow = res;
           let margindetailsUpdated=this.shared.getMarginDetailsRes();
           for(let i = 0 ; i < margindetailsUpdated.length ; i++){
             if(margindetailsUpdated[i].id == row.id){
               margindetailsUpdated[i]=res;
              this.marginDetailsDataView.setItems(margindetailsUpdated);
              this.grid.invalidate();
              this.grid.render();
              break;               
              }
           }           
         });
      });
      
      this.grid.onColumnsReordered.subscribe((e, args) => {
        this.UpdateAllTotals(args.grid,selectedRows);
    }); 

  let selectActiveRow =  false;

  this.grid.setSelectionModel(new Slick.RowSelectionModel({selectActiveRow: false}));
  this.grid.onClick.subscribe((e,args) => {
      if(args.cell == 7){
        
      }

      if ($(e.target).hasClass("toggle")) {
        var item = this.marginDetailsDataView.getItem(args.row);
        if (item) {
          if (!item._collapsed) {
            item._collapsed = true;
          } else {
            item._collapsed = false;
          }

          this.marginDetailsDataView.updateItem(item.id, item);
        }
        e.stopImmediatePropagation();
      } 
    });
      this.marginDetailsDataView.onRowCountChanged.subscribe( (e, args) => {
        this.grid.updateRowCount();
        this.grid.render();
      });

      this.marginDetailsDataView.onRowsChanged.subscribe((e, args) => {     
        this.grid.invalidateRows(args.rows);
        this.grid.render();        
      });

      this.shared.setMarginDetailsGrid(this.grid);
      this.shared.setDataView(this.marginDetailsDataView);
      this.shared.setData(this.data);

    })
        });
  };

  setGrid(gridData){
    this.gridCopy = gridData;
  };
  
  selectAll() {
    let rows = [];
    for (let i = 0; i < this.gridCopy.getDataLength(); i++) {
      rows.push(i);
    }
    this.gridCopy.setSelectedRows(rows);
  };

}
