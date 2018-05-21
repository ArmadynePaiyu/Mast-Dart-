import { Component, OnInit,Injectable  } from '@angular/core';
import { Router} from "@angular/router";

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
@Injectable()
export class AnnouncementComponent implements OnInit {
 announcement:any[];
 registrationRoutes = ['selfReg', 'home'];
  registrationStages = ['AnnouncementComponent', 'HomepageComponent'];
  stages = ['AnnouncementComponent'];
  currentIndex: number = 0;
  nextIndex: number;
  prevIndex: number;
  currentStage: string;
 
  constructor( private router: Router) {
   
    this.announcement = [{title:"Announcements",reason:"This is a private system operated by hewlett packard Enterprise services"},
    {title:"Announcements1",reason:"This is a private system operated by hewlett packard Enterprise services"},
    {title:"Announcements2",reason:"This is a private system operated by hewlett packard Enterprise services"}];
 
 }
 ngOnInit() {
  // this.router.navigate(['selfReg']);
  }

 Continue(){
  if (this.stages.length <= 2) {
      this.nextIndex = this.currentIndex + 1;
      this.currentIndex = this.nextIndex;
      this.currentStage = this.registrationRoutes[this.currentIndex];
      this.stages.push(this.registrationStages[this.currentIndex]);
      this.router.navigate([this.currentStage]);
    };




   }  
  

  

}
