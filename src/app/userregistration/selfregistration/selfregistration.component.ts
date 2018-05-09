import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-selfregistration',
  templateUrl: './selfregistration.component.html',
  styleUrls: ['./selfregistration.component.css']
})
export class SelfregistrationComponent implements OnInit {
  selfReg : Object [];

  constructor() {
    this.selfReg =[
      {
        title:['Self Access Request'],
        radiOptions:[
          {opt:'I am a New User and want to register myself'},
          {opt:'I want to access my product line and countries'},
          {opt:'I want to change my access profile'},
          {opt:'I want to extend my expring account'},
          {opt:'My Account already expired and i want to regain access'},
          {opt:'My Login or Employee number changed and i want to regain access'},
          {opt:'I want to cancel my previous request'}
        ]
      },
      {
        title:['Approve Request','Query','Manager'],
        radiOptions:[
          {opt:'I am a mast approver or manager and want to approve access.'},
          {opt:'I want to check the status of a pending request.'},
          {opt:'I am a manager and i want to register a new user'}
        ]
      },
      {
        title:['Admin'],
        radiOptions:[
          {opt:'I am a New User and want to register myself'},
          {opt:'I want to access my product line and countries'},
          {opt:'I want to change my access profile'},
          {opt:'I want to cancel my previous request'},
          {opt:'I want to access my product line and countries'},
          {opt:'I want to change my access profile'},
          {opt:'I want to cancel my previous request'}
        ]
      }
    ]

   }

  ngOnInit() {
  }

}
