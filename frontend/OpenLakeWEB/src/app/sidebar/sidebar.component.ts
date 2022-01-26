import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  Toggle(){
    var element = document.getElementById("accordionSidebar");
    if(element && element.className == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"){
      element.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
    }
    else if(element){
      element.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
    }
  }
}
