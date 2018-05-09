import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
@Component({
  selector: 'app-userregistration',
  templateUrl: './userregistration.component.html',
  styleUrls: ['./userregistration.component.css']
})
export class UserregistrationComponent implements OnInit {
  registrationRoutes = ['selfReg', 'newUserReg', 'country', 'prodLines',
    'summary', 'confirm'];
  registrationStages = ['Mast Self Registration', 'New User Registration', 'Select Country',
    'Product Lines', 'Summary', 'Confirm'];
  stages = ['Mast Self Registration'];
  currentIndex: number = 0;
  nextIndex: number;
  prevIndex: number;
  currentStage: string;
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.navigate(['selfReg']);
  }
  goPrevious() {
    console.log('Prev');
    if (this.stages.length >= 2) {
      this.prevIndex = this.currentIndex - 1;
      this.currentIndex = this.prevIndex;
      this.currentStage = this.registrationRoutes[this.currentIndex];
      this.stages.splice(this.currentIndex + 1 , 1);
      this.router.navigate([this.currentStage]);
    };
  }
  goNext() {
    if (this.stages.length <= 5) {
      this.nextIndex = this.currentIndex + 1;
      this.currentIndex = this.nextIndex;
      this.currentStage = this.registrationRoutes[this.currentIndex];
      this.stages.push(this.registrationStages[this.currentIndex]);
      this.router.navigate([this.currentStage]);
    };

  }
}
