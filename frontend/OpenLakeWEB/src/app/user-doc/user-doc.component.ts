import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-doc',
  templateUrl: './user-doc.component.html',
  styleUrls: ['./user-doc.component.scss']
})
export class UserDocComponent implements OnInit {
  panelOpenState = true;
  constructor() { }

  ngOnInit(): void {
  }

}
