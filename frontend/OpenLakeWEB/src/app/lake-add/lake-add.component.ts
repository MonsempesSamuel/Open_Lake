import { Component, Inject, OnInit } from '@angular/core';
import { Lake } from 'src/app/models/lake.model';
import { LakesService } from 'src/app/services/lakes.service';
import {  MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';

@Component({
  selector: 'app-lake-add',
  templateUrl: './lake-add.component.html',
  styleUrls: ['./lake-add.component.scss']
})
export class LakeAddComponent implements OnInit {

  // lakes?: Lake[];
  // currentLake: Lake = {};
  // currentIndex = -1;
  // title = '';
  lake: Lake = {
    name: '',
    address: '',
  };

  submitted = false;

  constructor(private lakesService: LakesService, public dialogRef: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  saveLake(): void {
    const data = {
      name: this.lake.name,
      address: this.lake.address
    };

    this.lakesService.create(data)
      .subscribe(
        response => {
          this.submitted = true;
          this.dialogRef.close("true");
        },
        error => {
          console.log(error);
        });
  }
}
