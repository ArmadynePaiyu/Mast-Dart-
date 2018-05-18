import { Component, OnInit } from '@angular/core';


declare var Slick: any;

@Component({
  selector: 'app-goal-seek',
  templateUrl: './goal-seek.component.html',
  styleUrls: ['./goal-seek.component.css']
})
export class GoalSeekComponent implements OnInit {
 productnotes:any[];

  constructor() { 
    
    this.productnotes = [
    {title:"D",reason:"meaningCVBBNNKJKJK"},
    {title:"E",reason:"vdfheuhtkerntgklejgk"},
    {title:"F",reason:"CATEPQIUEHKWJFKF"},
    {title:"M",reason:"what abtb rfuigjrej"},
    {title:"T",reason:"shalligibertdJHDBAF"},
    {title:"X",reason:"howrutombncyqwerytik"}
    ];

    
  }
opendialouge(){
console.log("asdfdf");
};


  ngOnInit() {
  }

}
