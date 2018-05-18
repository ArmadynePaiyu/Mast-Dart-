import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-announcement',
  templateUrl: './announcement.component.html',
  styleUrls: ['./announcement.component.css']
})
export class AnnouncementComponent implements OnInit {
 announcement:any[];
  constructor() {
    this.announcement = [{title:"Announcements",reason:"This is a private system operated by hewlett packard Enterprise services"},
    {title:"Announcements1",reason:"This is a private system operated by hewlett packard Enterprise services"},
    {title:"Announcements2",reason:"This is a private system operated by hewlett packard Enterprise services"}];
   }

  ngOnInit() {
  }

}
