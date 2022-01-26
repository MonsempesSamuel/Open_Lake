import { Component, OnInit, Inject } from '@angular/core';
import { Analysis } from '../models/analysis.model';
import { AnalysisService } from '../services/analysis.service';
import {  MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';


@Component({
  selector: 'app-analysis-add',
  templateUrl: './analysis-add.component.html',
  styleUrls: ['./analysis-add.component.scss']
})
export class AnalysisAddComponent implements OnInit {

  analysis: Analysis = {
    datenav: '',
    hournav: '',
    durationnav: '',
    drone: '',
    lake: '',
  };


  constructor(private analysisService: AnalysisService, public dialogRef: MatDialogRef<any>, @Inject(MAT_DIALOG_DATA) public idlake: any) {
    this.analysis.lake = idlake;
  }

  ngOnInit(): void {
  }

  saveAnalysis(): void {
    const data = {
      datenav: this.analysis.datenav,
      heurenav: this.analysis.hournav,
      dureenav: this.analysis.durationnav,
      drone: this.analysis.drone,
      lake: this.analysis.lake
    };

    this.analysisService.create(data)
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
