import { Component, OnInit, Inject } from '@angular/core';
import { Analysis } from '../models/analysis.model';
import { AnalysisService } from '../services/analysis.service';
import { DataService } from '../services/data.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Data } from '../models/data.model';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DataAddComponent } from 'src/app/data-add/data-add.component';


@Component({
  selector: 'app-analysis-details',
  templateUrl: './analysis-details.component.html',
  styleUrls: ['./analysis-details.component.scss']
})
export class AnalysisDetailsComponent implements OnInit {
  datas?: Data[];
  currentAnalysis: Analysis = {
    datenav: '',
    hournav: '',
    durationnav: '',
    drone: '',
    lake: '',
  };
  lakeret: number;
  currentData: Data = {};
  trashid: any;
  nbelement: any;
  nbpages: any[];
  page: any;
  page_size: any;


  constructor(
    private analyzesService: AnalysisService,
    private dataService: DataService,
    public route: ActivatedRoute,
    private router: Router,
    public dialog: MatDialog,
    public authService: AuthService) {
    this.nbpages = [];
    this.trashid = null;
    this.lakeret = 0;
  }

  ngOnInit(): void {
    this.getAnalysis(this.route.snapshot.params.id);
    this.page = 1;
    this.page_size = 10;
    this.retrieveData();
    this.route.queryParams.subscribe(p => {
      this.lakeret = p.lake;
    });
  }

  getAnalysis(id: string): void {
    this.analyzesService.get(id)
      .subscribe(
        data => {
          this.currentAnalysis = data;
        },
        error => {
          console.log(error);
        });
  }

  add_data(){
    const dialogRef = this.dialog.open(DataAddComponent, {data: this.route.snapshot.params.id});
    dialogRef.afterClosed().subscribe(result => {
      if (result) this.retrieveData();
    });
  }

  delete_data(id: number){
    if(this.trashid==id){
      this.dataService.delete(id)
        .subscribe(
          response => {
            this.retrieveData();
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

  modify_data(data: Data){
    this.currentData = Object.assign({}, data)
  }

  update_data(): void {
    this.dataService.update(this.currentData.id, this.currentData)
      .subscribe(
        response => {
          this.retrieveData();
          this.currentData.id = null;
        },
        error => {
          console.log(error);
        });
  }

  change_page(page: number){
    this.page = (page<1)?1:(page>this.nbpages.length)?this.nbpages.length:page;
    this.retrieveData();
  }


  retrieveData(): void {
    this.dataService.getDatas(this.page, this.page_size, this.route.snapshot.params.id)
      .subscribe(
        data => {
          this.datas = data.results;
          this.nbelement = data.count;
          console.log(this.datas);

          // generate the pagination
          this.nbpages = Array(Math.ceil(this.nbelement/this.page_size)).fill(1).map((x,i)=>i+1);

        },
        error => {
          console.log(error);
        }
      );
  }
}
