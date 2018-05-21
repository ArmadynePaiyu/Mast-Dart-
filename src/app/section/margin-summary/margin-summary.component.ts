import { Component, OnInit } from '@angular/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import 'slickgrid';
declare var Slick: any;
var dataView;
var columnsWithHighlightingById={};

@Component({
  selector: 'app-margin-summary',
  templateUrl: './margin-summary.component.html',
  styleUrls: ['./margin-summary.component.css']
})
export class MarginSummaryComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    
    var dataView;
var grid;
var data = [];
var columns = [
  /*{id: "sel", 
  name: "#",
  field: "num",
   cssClass: "cell-selection", 
  //  width: 40, 
   resizable: false, 
   selectable: false, 
   focusable: false
   },*/
  {id: "metrics",
   name: "Metrics", 
   field: "metrics", 
   width: 200, 
   minWidth: 50, 
   cssClass: "cell-title", 
   sortable: true, 
 //  editor: Slick.Editors.Text
  },
  {id: "50", 
  name: "50", 
  field: "50", 
  // width: 70,
  sortable: true,
  editor: Slick.Editors.Text
  },
  /*{id: "%",
   name: "% Complete",
  field: "percentComplete",
  //  width: 80, 
   formatter: Slick.Formatters.PercentCompleteBar, 
   sortable: true
  },
  {id: "start", 
  name: "Start", 
  field: "start", 
  // minWidth: 60, 
  sortable: true
},
  {id: "finish", 
  name: "Finish",
  field: "finish", 
  // minWidth: 60, 
  sortable: true
},
  {id: "cost", 
  name: "Cost", 
  field: "cost", 
  // width: 90, 
  sortable: true
},
  {id: "effort-driven",
   name: "Effort Driven", 
  //  width: 80,
  //   minWidth: 20, 
  //   maxWidth: 80, 
    cssClass: "cell-effort-driven", 
    field: "effortDriven", 
    formatter: Slick.Formatters.Checkmark, 
    sortable: true
  }*/
  {id: "43", 
  name: "43", 
  field: "43", 
  // width: 70,
  sortable: true,
  editor: Slick.Editors.Text
  },
  {id: "44", 
  name: "44", 
  field: "44", 
  // width: 70,
  sortable: true,
  editor: Slick.Editors.Text
  },
  {id: "45", 
  name: "45", 
  field: "45", 
  // width: 70,
   sortable: true,
    editor: Slick.Editors.Text
  },
  {id: "46", 
  name: "46", 
  field: "46", 
  // width: 70,
  sortable: true,
  editor: Slick.Editors.Text
  },
  {id: "47", 
  name: "47", 
  field: "47", 
  // width: 70,
  sortable: true,
  editor: Slick.Editors.Text
  }
];
var options = {
  enableCellNavigation: true,
  editable: true,
  editableRow: true,
};
var sortcol = "title";
var sortdir = 1;
var percentCompleteThreshold = 0;
var prevPercentCompleteThreshold = 0;
$("slick-header-columns").find('.ui-sortable').css('display', 'none');
/*function avgTotalsFormatter(totals, columnDef) {
  var val = totals.avg && totals.avg[columnDef.field];
  if (val != null) {
    return "avg: " + Math.round(val) + "%";
  }
  return "";
}
function sumTotalsFormatter(totals, columnDef) {
  var val = totals.sum && totals.sum[columnDef.field];
  if (val != null) {
    return "total: " + ((Math.round(parseFloat(val) * 100) / 100));
  }
  return "";
}*/
/*var toggleFormatter = function (row, cell, value, columnDef, dataContext) {
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
    };*/
/*function myFilter(item, args) {
  return item["percentComplete"] >= args.percentComplete;
}
function percentCompleteSort(a, b) {
  return a["percentComplete"] - b["percentComplete"];
}*/
function comparer(a, b) {
  var x = a[sortcol], y = b[sortcol];
  return (x == y ? 0 : (x > y ? 1 : -1));
}
  
function groupByDuration() {
  debugger;
  dataView.setGrouping({
    getter: "section",
    formatter: function (g) {
      // return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
      return  g.value ;
    },
    aggregators: [
      new Slick.Data.Aggregators.Avg("percentComplete"),
      new Slick.Data.Aggregators.Sum("cost")
    ],
    aggregateCollapsed: false,
    lazyTotalsCalculation: true
  });
}

/*function groupByDurationOrderByCount(aggregateCollapsed) {
  dataView.setGrouping({
    getter: "duration",
    formatter: function (g) {
      return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
    },
    comparer: function (a, b) {
      return a.count - b.count;
    },
    aggregators: [
      new Slick.Data.Aggregators.Avg("percentComplete"),
      new Slick.Data.Aggregators.Sum("cost")
    ],
    aggregateCollapsed: aggregateCollapsed,
    lazyTotalsCalculation: true
  });
}
function groupByDurationEffortDriven() {
  dataView.setGrouping([
    {
      getter: "duration",
      formatter: function (g) {
        return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Slick.Data.Aggregators.Sum("duration"),
        new Slick.Data.Aggregators.Sum("cost")
      ],
      aggregateCollapsed: true,
      lazyTotalsCalculation: true
    },
    {
      getter: "effortDriven",
      formatter: function (g) {
        return "Effort-Driven:  " + (g.value ? "True" : "False") + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Slick.Data.Aggregators.Avg("percentComplete"),
        new Slick.Data.Aggregators.Sum("cost")
      ],
      collapsed: true,
      lazyTotalsCalculation: true
    }
  ]);
}
function groupByDurationEffortDrivenPercent() {
  dataView.setGrouping([
    {
      getter: "duration",
      formatter: function (g) {
        return "Duration:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Slick.Data.Aggregators.Sum("duration"),
        new Slick.Data.Aggregators.Sum("cost")
      ],
      aggregateCollapsed: true,
      lazyTotalsCalculation: true
    },
    {
      getter: "effortDriven",
      formatter: function (g) {
        return "Effort-Driven:  " + (g.value ? "True" : "False") + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Slick.Data.Aggregators.Sum("duration"),
        new Slick.Data.Aggregators.Sum("cost")
      ],
      lazyTotalsCalculation: true
    },
    {
      getter: "percentComplete",
      formatter: function (g) {
        return "% Complete:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
      },
      aggregators: [
        new Slick.Data.Aggregators.Avg("percentComplete")
      ],
      aggregateCollapsed: true,
      collapsed: true,
      lazyTotalsCalculation: true
    }
  ]);
}
function groupByStartAndAggregatePercent() {
  dataView.setGrouping({
    getter: "start",
    formatter: function (g) {
      return "Start:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
    },
    aggregators: [
      new Slick.Data.Aggregators.WeightedAvg("percentComplete", "duration")
    ],
    aggregateCollapsed: true,
    lazyTotalsCalculation: true
  });
}
function groupByStartAndAggregatePercent_() {
  dataView.setGrouping({
    getter: "start",
    formatter: function (g) {
      return "Start:  " + g.value + "  <span style='color:green'>(" + g.count + " items)</span>";
    },
    aggregators: [
      new Slick.Data.Aggregators.Avg("percentComplete")
    ],
    aggregateCollapsed: true,
    lazyTotalsCalculation: true
  });
}*/
function loadData(count) {
  //var someDates = ["01/01/2009", "02/02/2009", "03/03/2009"];
  data = [
    
  {
    "id":"id0",
    "50":"10%",
    "43":"11%",
    "44":"12%",
    "45":"13%",
    "46":"14%",
    "47":"15%",
    "section":"Pricing",
    metrics:"Group Disc%",
    celEdit:true,
    rowColor:'blue'
  },
  {
    "id":"id1",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Pricing",
    metrics:"Group Revenue",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id2",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Pricing",
    metrics:"Total Discount %",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id3",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Pricing",
    metrics:"Extend BDNET",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id4",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
     section:"Pricing",
    metrics:"Net Revenue",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id5",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Pricing",
    metrics:"Total Contra %",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id6",
   "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Pricing",
    metrics:"Total Contra",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id7",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
     section:"Margin",
    metrics:"Gross Margin",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id8",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
     section:"Margin",
    metrics:"Gross Margin %",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id9",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Margin",
    metrics:"Group Gross Margin %",
    celEdit:true,
    rowColor:'blue'
  },
  {
    "id":"id10",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
     section:"Margin",
    metrics:"Group Net Margin %",
    celEdit:true,
    rowColor:'blue'
  },
  {
    "id":"id11",
    Total:"99%",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Guidance",
    metrics:"BDNet Price With guidance",
    celEdit:false,
    rowColor:'red'
  },
  {
    "id":"id12",
    "50":"1%",
    "43":"1%",
    "44":"1%",
    "45":"1%",
    "46":"1%",
    "47":"1%",
    section:"Guidance",
    metrics:"Net Reverse with guidance",
    celEdit:false,
    rowColor:'red'
  }
  ];
 /* dataView.getItemMetadata = function (row) {
    console.log('entering '+row);
 let   temp_row=row;
      if (row == 1) {
        return {
          "columns": {
            "43": {           
              "editor": Slick.Editors.Text
            },
             "44": {           
              "editor": Slick.Editors.Text
            },
             "45": {           
              "editor": Slick.Editors.Text
            },
             "46": {           
              "editor": Slick.Editors.Text
            },
             "47": {           
              "editor": Slick.Editors.Text
            },
             "50": {           
              "editor": Slick.Editors.Text
            }
          }
        };
      } 
};*/
  // prepare the data
 /* for (var i = 0; i < count; i++) {
    var d = (data[i] = {});
    d["id"] = "id_" + i;
    d["num"] = i;
    d["title"] = "Task " + i;
    d["duration"] = Math.round(Math.random() * 30);
    d["percentComplete"] = Math.round(Math.random() * 100);
    d["start"] = someDates[ Math.floor((Math.random() * 2)) ];
    d["finish"] = someDates[ Math.floor((Math.random() * 2)) ];
    d["cost"] = Math.round(Math.random() * 10000) / 100;
    d["effortDriven"] = (i % 5 == 0);
    console.log(data);
  }*/
  dataView.setItems(data);
}
function myRowCss(item) {
  if (item.effortDriven) {
    return {
      cssClasses: "row-green"
    }
  }
}
var groupItemMetadataProvider = new Slick.Data.GroupItemMetadataProvider({
  getRowMetadata: myRowCss
});
$(".grid-header .ui-icon")
  .addClass("ui-state-default ui-corner-all")
  .mouseover(function (e) {
    $(e.target).addClass("ui-state-hover")
  })
  .mouseout(function (e) {
    $(e.target).removeClass("ui-state-hover")
  });
$(function () {
  dataView = new Slick.Data.DataView({
    groupItemMetadataProvider: groupItemMetadataProvider,
    inlineFilters: true
  });
   dataView.getItemMetadata = function (row) {
      var item = dataView.getItem(row);
       // if (item.rows[row]["rowColor"] == 'blue') {
         if(item.rows){
        for (var i = 0; i < item.rows.length; i++) { 
              if(item.rows[i]["rowColor"] == 'blue'){
                 return { "cssClasses": "coloooor" };
              }
        }
           
        }else{
          if(item.rowColor=='blue'){
             return { "cssClasses": "coloooor" };
          }
        }
      };
  grid = new Slick.Grid("#marginSummaryGrid", dataView, columns, options);
  var headerButtonsPlugin = new Slick.Plugins.HeaderButtons();
    headerButtonsPlugin.onCommand.subscribe(function(e, args) {
      var column = args.column;
      var button = args.button;
      var command = args.command;
      if (command == "toggle-highlight") {
        if (button.cssClass == "icon-highlight-on") {
          delete columnsWithHighlightingById[column.id];
          button.cssClass = "icon-highlight-off";
          button.tooltip = "Highlight negative numbers."
        } else {
          columnsWithHighlightingById[column.id] = true;
          button.cssClass = "icon-highlight-on";
          button.tooltip = "Remove highlight."
        }
        grid.invalidate();
      }
    });
    grid.registerPlugin(headerButtonsPlugin);
  /*grid.onClick.subscribe(function (e, args) {

  grid.enableRowAsEditable(args.row);
});*/
  // register the group item metadata provider to add expand/collapse group handlers
  grid.registerPlugin(groupItemMetadataProvider);
  grid.setSelectionModel(new Slick.CellSelectionModel());
  grid.onBeforeEditCell.subscribe(function(e,args) {
      console.log(' row '+args.row+' cell '+args.cell +' item '+args.item["metrics"])
        var list =args;
      if (args.item["celEdit"] != true) {
        return false; 
      }
    });

    
    
  var pager = new Slick.Controls.Pager(dataView, grid, $("#pager"));
  
  var columnpicker = new Slick.Controls.ColumnPicker(columns, grid, options);
 grid.onSort.subscribe(function (e, args) {
    sortdir = args.sortAsc ? 1 : -1;
    sortcol = args.sortCol.field;
    if (1 <= 8) {
      // using temporary Object.prototype.toString override
      // more limited and does lexicographic sort only by default, but can be much faster
      var percentCompleteValueFn = function () {
        var val = this["percentComplete"];
        if (val < 10) {
          return "00" + val;
        } else if (val < 100) {
          return "0" + val;
        } else {
          return val;
        }
      };
      // use numeric sort of % and lexicographic for everything else
      dataView.fastSort((sortcol == "percentComplete") ? percentCompleteValueFn : sortcol, args.sortAsc);
    }
    else {
      // using native sort with comparer
      // preferred method but can be very slow in IE with huge datasets
      dataView.sort(comparer, args.sortAsc);
    }
  });
  // wire up model events to drive the grid
  dataView.onRowCountChanged.subscribe(function (e, args) {
    grid.updateRowCount();
    grid.render();
  });
  dataView.onRowsChanged.subscribe(function (e, args) {
    grid.invalidateRows(args.rows);
    grid.render();
  });
  var h_runfilters = null;
  // wire up the slider to apply the filter to the model
 /* $("#pcSlider,#pcSlider2").slider({
    "range": "min",
    "slide": function (event, ui) {
      Slick.GlobalEditorLock.cancelCurrentEdit();
      if (percentCompleteThreshold != ui.value) {
        window.clearTimeout(h_runfilters);
        h_runfilters = window.setTimeout(filterAndUpdate, 10);
        percentCompleteThreshold = ui.value;
      }
    }
  });*/
  /*function filterAndUpdate() {
    var isNarrowing = percentCompleteThreshold > prevPercentCompleteThreshold;
    var isExpanding = percentCompleteThreshold < prevPercentCompleteThreshold;
    var renderedRange = grid.getRenderedRange();
    dataView.setFilterArgs({
      percentComplete: percentCompleteThreshold
    });
    dataView.setRefreshHints({
      ignoreDiffsBefore: renderedRange.top,
      ignoreDiffsAfter: renderedRange.bottom + 1,
      isFilterNarrowing: isNarrowing,
      isFilterExpanding: isExpanding
    });
    dataView.refresh();
    prevPercentCompleteThreshold = percentCompleteThreshold;
  }*/
  // initialize the model after all the events have been hooked up
  dataView.beginUpdate();
 // dataView.setFilter(myFilter);
  dataView.setFilterArgs({
    percentComplete: percentCompleteThreshold
  });
  loadData(50);
  groupByDuration();
  dataView.endUpdate();
  //$("#gridContainer").resizable();
})
    
 
    
  }
  
}
