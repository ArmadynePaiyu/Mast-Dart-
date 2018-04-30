import { Component, OnInit } from '@angular/core';
import { HotTableModule } from 'ng2-handsontable';
import * as Handsontable from 'handsontable';

@Component({
  selector: 'app-filter-component',
  templateUrl: './filter-component.component.html',
  styleUrls: ['./filter-component.component.css']
})

export class FilterComponentComponent implements OnInit {

  constructor() {

  }

  initialLoaddata : any = [
    {
      "productname": "7123456-01",
      "netprice": "150",
      "productionprice": "250",
      "grossmargin": "350",
      "prodHierarchyProps": {
        "expanded": true,
        "groupExpanded": true,
        "lineTypeCd": "Config",
        "groupId": "7123456-01",
        "assetItemNr": "1",
        "hasChildren": true,
        "cnfgnParentLineItemId": "0"
      }
    },
    {
      "productname": "BW900AR",
      "netprice": "150",
      "productionprice": "250",
      "grossmargin": "350",
      "prodHierarchyProps": {
        "expanded": true,
        "groupExpanded": true,
        "lineTypeCd": "Config",
        "groupId": "7123456-01",
        "assetItemNr": "1",
        "hasChildren": false,
        "cnfgnParentLineItemId": "0"
      }
    },
    {
      "productname": "JW172A",
      "netprice": "150",
      "productionprice": "250",
      "grossmargin": "350",
      "prodHierarchyProps": {
        "expanded": true,
        "groupExpanded": true,
        "lineTypeCd": "Product",
        "groupId": "7123456-01",
        "assetItemNr": "2",
        "hasChildren": false,
        "cnfgnParentLineItemId": "0"
      }
    },
    {
      "productname": "7123456-02",
      "netprice": "150",
      "productionprice": "250",
      "grossmargin": "350",
      "prodHierarchyProps": {
        "expanded": true,
        "groupExpanded": false,
        "lineTypeCd": "Product",
        "groupId": "7123456-02",
        "assetItemNr": "2",
        "hasChildren": true,
        "cnfgnParentLineItemId": "0"
      }
    },
    {
      "productname": "RT467A",
      "netprice": "150",
      "productionprice": "250",
      "grossmargin": "350",
      "prodHierarchyProps": {
        "expanded": false,
        "groupExpanded": false,
        "lineTypeCd": "Product",
        "groupId": "7123456-02",
        "assetItemNr": "2",
        "hasChildren": false,
        "cnfgnParentLineItemId": "0"
      }
    }
  ];

  ngOnInit() {
    this.renderTable(this.initialLoaddata);
  }

 
  renderTable(parameteredData){

  var initialLoaddata = JSON.parse(JSON.stringify(parameteredData));
    var container = document.getElementById('example1');
    var hotoptions = {

      colHeaders: ['Config', 'Artist', 'Title', 'Album', 'Label'],
      data: initialLoaddata,
      rowHeaders: true,
      // colHeaders: true,
      // colWidths: [45, 100, 180, 160, 160, 0.1, 80],
      // rowHeights: [50, 40, 100],
      manualColumnResize: true,
      manualRowResize: true,
      minSpareRows: 1,
      startRows: 25,
      columnSorting: true,
      hiddenColumns: {
        //columns: [6],
        indicators: true,
        contextMenu: true,
      },
      afterSelection: function (r, c, r2, c2, preventScrolling, selectionLayerLevel) {

        if (c == 0) {
          console.log(r, c, r2, c2, preventScrolling, selectionLayerLevel);

          var data = this.getDataAtRow(r);
          data[0].groupExpanded = !data[0].groupExpanded;
          // console.log(this);
            console.log(initialLoaddata);
         var newData =  getChildrenIndices(initialLoaddata);
        hot.loadData(newData);
          hot.render();
        }

      },
      afterChange: function (changes, source) {
      //  debugger;
        // console.log(changes, source);
      },
      modifyRow : function(row) {
        
        // console.log(row);
          // var rowOffset = 0;
          // console.log(this.data);
          // if (row >= 2) { // hide two rows starting at index 2 (so ID 3 and 4 are excluded)
          //   rowOffset = rowOffset + 2;
          // }
          // // if (row >= 7) { // hide one row starting at index 7 (so ID 10 is excluded)
          // //   rowOffset = rowOffset + 1;
          // // }
          // row = row + rowOffset;

          // return row <= countSourceRows ? row : null;
      },
      columns: [
        {
          data: "prodHierarchyProps",
          editor: false,
          renderer: coverRenderer
        },
        {
          data: 'productname',
          //editor: 'text',
          editor: 'autocomplete',
          source: ["bw900ar", "u2sm4e", "jw172a", "jw085a", "bw900ar", "jw172a", "jw085a", "u2sm4e"]
        },
        {
          data: 'netprice',
          editor: 'numeric'
        },
        {
          data: 'productionprice',
          editor: 'numeric'
        },
        {
          data: 'grossmargin',
          editor: 'numeric'
        }
      ]
    };

    var hot = new Handsontable(container, hotoptions);
    // hot.addHook('afterSelection', function () {

    // });
    var countSourceRows = hot.countSourceRows() - 1;

    function coverRenderer(instance, td, row, col, prop, value, cellProperties) {

      // console.log(instance, td, row, col, prop, value, cellProperties);

      var img;

      img = document.createElement('p');
      if(value !=null){
         if(value.hasChildren){
        if (!value.groupExpanded) {
        // img.src = Handsontable.helper.stringify("https://cdn4.iconfinder.com/data/icons/ios7-essence/22/add_plus-512.png");
        img.innerText = '+';
        //delete  this.data[row]
        } else {
            // img.src = Handsontable.helper.stringify("https://cdn3.iconfinder.com/data/icons/interface/100/minus_button_2-512.png");
            img.innerText = '-';
          }
      }
      }
     
      

     /* Handsontable.dom.addEvent(img, 'onclick', function () {
        debugger;
        console.log("Clicked -----")
        this.data[row].groupExpanded = !this.data[row].groupExpanded;
        // e.preventDefault(); // prevent selection quirk
      });*/

      Handsontable.dom.empty(td);

      td.appendChild(img);

      return td;
    }

    function getChildrenIndices(originalData){
      let childArr : any = [];
      console.log(originalData);
      childArr = originalData;
      childArr.splice(1,1);
      return childArr;
    }
  
  }
  
}



