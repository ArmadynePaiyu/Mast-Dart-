import { Component, OnInit } from '@angular/core';
import { AngularSlickgridModule } from 'angular-slickgrid';
import * as $ from 'jquery';
import 'slickgrid';
declare var Slick: any;


@Component({
  selector: 'app-rollout',
  templateUrl: './rollout.component.html',
  styleUrls: ['./rollout.component.css']
})
export class RolloutComponent implements OnInit {

  constructor() {
    debugger;
    var grid;
    var data = [];
    var columns = [
      { id: "title", name: "Title", field: "title", width: 120, cssClass: "cell-title", editor: Slick.Editors.Text },
      { id: "range", name: "Range", width: 120, formatter: NumericRangeFormatter, editor: NumericRangeEditor }
    ];
    var options = {
      editable: true,
      enableAddRow: false,
      enableCellNavigation: true,
      asyncEditorLoading: false
    };
    function NumericRangeFormatter(row, cell, value, columnDef, dataContext) {
      return dataContext.from + " - " + dataContext.to;
    }
    function NumericRangeEditor(args) {
      var $from, $to;
      var scope = this;
      this.init = function () {
        $from = $("<INPUT type=text style='width:40px' />")
          .appendTo(args.container)
          .bind("keydown", scope.handleKeyDown);
        $(args.container).append("&nbsp; to &nbsp;");
        $to = $("<INPUT type=text style='width:40px' />")
          .appendTo(args.container)
          .bind("keydown", scope.handleKeyDown);
        scope.focus();
      };
      /*this.handleKeyDown = function (e) {
        if (e.keyCode == $.ui.keyCode.LEFT || e.keyCode == $.ui.keyCode.RIGHT || e.keyCode == $.ui.keyCode.TAB) {
          e.stopImmediatePropagation();
        }
      };*/
      this.destroy = function () {
        $(args.container).empty();
      };
      this.focus = function () {
        $from.focus();
      };
      this.serializeValue = function () {
        return { from: parseInt($from.val(), 10), to: parseInt($to.val(), 10) };
      };
      this.applyValue = function (item, state) {
        item.from = state.from;
        item.to = state.to;
      };
      this.loadValue = function (item) {
        $from.val(item.from);
        $to.val(item.to);
      };
      this.isValueChanged = function () {
        return args.item.from != parseInt($from.val(), 10) || args.item.to != parseInt($from.val(), 10);
      };
      this.validate = function () {
        if (isNaN(parseInt($from.val(), 10)) || isNaN(parseInt($to.val(), 10))) {
          return { valid: false, msg: "Please type in valid numbers." };
        }
        if (parseInt($from.val(), 10) > parseInt($to.val(), 10)) {
          return { valid: false, msg: "'from' cannot be greater than 'to'" };
        }
        return { valid: true, msg: null };
      };
      this.init();
    }
    $(function () {
      for (var i = 0; i < 500; i++) {
        var d = (data[i] = {});
        d["title"] = "Task " + i;
        d["from"] = Math.round(Math.random() * 100);
        d["to"] = d["from"] + Math.round(Math.random() * 100);
      }
      grid = new Slick.Grid("#rolloutGrid", data, columns, options);
      grid.onValidationError.subscribe(function (e, args) {
        alert(args.validationResults.msg);
      });
    })
  }
  ngOnInit() {
    console.log('Roll out');
  }
}
