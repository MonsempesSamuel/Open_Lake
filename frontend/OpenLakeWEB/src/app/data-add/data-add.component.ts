import { Component, OnInit, Inject } from '@angular/core';
import { Data } from '../models/data.model';
import { DataService } from '../services/data.service';
import {  MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-data-add',
  templateUrl: './data-add.component.html',
  styleUrls: ['./data-add.component.scss']
})
export class DataAddComponent implements OnInit {
  data: Data = {
    latgps: '',
    longgps: '',
    temperature: '',
    ph: '',
    conductivity: '',
    freqbat: '',
    analysis: '',
  };

  constructor(private dataService: DataService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public idanalysis: any) {
    this.data.analysis = idanalysis;
  }

  ngOnInit(): void {
  }

  saveData(): void {
    const dataaux = {
      latgps: this.data.latgps,
      longgps: this.data.longgps,
      datatemperature: this.data.temperature,
      dataph: this.data.ph,
      dataconductivite: this.data.conductivity,
      freqbat: this.data.freqbat,
      analyse: this.data.analysis
    };

    this.dataService.create(dataaux)
      .subscribe(
        response => {
          console.log(response);
          this.dialogRef.close("true");
        },
        error => {
          console.log(error);
        }
      );
  }
}
