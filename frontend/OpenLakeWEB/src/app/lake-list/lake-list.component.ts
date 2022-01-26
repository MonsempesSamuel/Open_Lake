import { Component, OnInit, Inject} from '@angular/core';
import { Lake } from 'src/app/models/lake.model';
import { LakeList } from 'src/app/models/lakelist.model';
import { LakesService } from 'src/app/services/lakes.service';
import { LakeAddComponent } from 'src/app/lake-add/lake-add.component';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import {MatAccordion} from '@angular/material/expansion';


@Component({
  selector: 'app-lake-list',
  templateUrl: './lake-list.component.html',
  styleUrls: ['./lake-list.component.scss'],
  viewProviders: [MatAccordion]
})
export class LakeListComponent implements OnInit {

  lakes?: Lake[];
  currentLake: Lake = {};
  trashid: any;
  nbelement: any;
  nbpages: any[];
  page: any;
  page_size: any;

  constructor(private lakesService: LakesService, public dialog: MatDialog, public authService: AuthService) {
    this.nbpages = [];
    this.trashid = null;
   }

  ngOnInit(): void {
    this.page = 1;
    this.page_size = 5;
    this.retrieveLakes();
  }

  add_lake(){
    const dialogRef = this.dialog.open(LakeAddComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.retrieveLakes();
    });
  }

  delete_lake(id: number){
    if(this.trashid==id){
      this.lakesService.delete(id)
        .subscribe(
          response => {
            this.retrieveLakes();
            this.trashid = null;
          },
          error => {
            console.log(error);
          });
      } else
      {
        this.trashid=id;
      }
  }

  modify_lake(lake: Lake){
    this.currentLake = Object.assign({}, lake)
  }

  update_lake(): void {
    this.lakesService.update(this.currentLake.id, this.currentLake)
      .subscribe(
        response => {
          this.retrieveLakes();
          this.currentLake.id = null;
        },
        error => {
          console.log(error);
        });
      }

  change_page(page: number){
    this.page = (page<1)?1:(page>this.nbpages.length)?this.nbpages.length:page;
    this.retrieveLakes();
  }

  retrieveLakes(): void {
    this.lakesService.getLakes(this.page, this.page_size)
    .subscribe(
      data => {
        this.lakes = data.results;
        this.nbelement = data.count;
        // generate the pagination
        this.nbpages = Array(Math.ceil(this.nbelement/this.page_size)).fill(1).map((x,i)=>i+1);
      },
      error => {
        console.log(error);
      }
    );
  }
}
