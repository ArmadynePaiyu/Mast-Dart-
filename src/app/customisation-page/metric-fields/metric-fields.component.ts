import { Component, OnInit,Input} from '@angular/core';
@Component({
  selector: 'app-metric-fields',
  templateUrl: './metric-fields.component.html',
  styleUrls: ['./metric-fields.component.css']
})
export class MetricFieldsComponent implements OnInit {
  metricGroup:any[] = [];
  metricFields:any[] = [{
    Pricing:{
      id:'pricing',
      fields:['Group Disc %','Gross Revenue','Total Discount %','Extended BDNet','Net Revenue','Total Contra%','Total Contra']
    },
    Cost:{
      id:'cost',
      fields:['Total Cos']
    },
    Margin:{
      id:'margin',
      fields:['Gross Margin %','Gross Margin','Net Margin %','Net Margin']
    },
    Guaidance:{
      id:'guidance',
      fields:['']
    }
  }];
  constructor() { 
    
  }

  ngOnInit() {

  }
  setMetricFields(groupName){
    if(this.metricGroup.indexOf(groupName) <= -1){
    this.metricGroup.push(groupName);
    
    }else{
      let index = this.metricGroup.indexOf(groupName);
      this.metricGroup.splice(index,1);
    }
   console.log(this.metricGroup);
  }
}
