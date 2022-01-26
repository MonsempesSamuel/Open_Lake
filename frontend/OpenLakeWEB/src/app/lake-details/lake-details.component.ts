import { Component, OnInit, Inject } from '@angular/core';
import { Lake } from 'src/app/models/lake.model';
import { LakesService } from 'src/app/services/lakes.service';
import { Analysis } from 'src/app/models/analysis.model';
import { AnalysisService } from '../services/analysis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AnalysisAddComponent } from 'src/app/analysis-add/analysis-add.component';
import {MatAccordion} from '@angular/material/expansion';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import {environment} from "../../environments/environment";


@Component({
  selector: 'app-lake-details',
  templateUrl: './lake-details.component.html',
  styleUrls: ['./lake-details.component.scss'],
  viewProviders: [MatAccordion]
})
export class LakeDetailsComponent implements OnInit {
  ph_date: any;
  temp_date: any;
  temp_conduc: any;
  datenav: any[];
  avg_ph: any[];
  avg_temp: any[];
  avg_conduc: any[];
  fileName = '';

  analyzes?: Analysis[];
  currentLake: Lake = {
    name: '',
    address: '',
  };
  currentAnalysis: Analysis = {};
  trashid: any;
  nbelement: any;
  nbpages: any[];
  page: any;
  page_size: any;




  // constructor(private lakesService: LakesService) { }
  constructor(private http: HttpClient,public accordion: MatAccordion,private analysisService: AnalysisService, private lakesService: LakesService, public route: ActivatedRoute, private router: Router, public dialog: MatDialog, public authService: AuthService) {

    this.nbpages = [];
    this.trashid = null;
    route.params.subscribe((val:any) => {
      this.ngOnInit()
    });
    this.datenav = [];
    this.avg_ph = [];
    this.avg_temp = [];
    this.avg_conduc = [];



  }
  onFileSelected(event : any) {

    const file:File = event.target.files[0];

    if (file) {

        this.fileName = file.name;
        const formData = new FormData();
        formData.append("file_uploaded", file);
        let headersimp = new HttpHeaders()
        headersimp.append('Content-Type','multipart/form-data')
        const baseUrl = environment.baseUrl + '/api/upload/'
        const upload$ = this.http.post(`${baseUrl}?lakeid=${this.currentLake.id}`, formData,{withCredentials: true, headers:headersimp},);
        upload$.subscribe(data => {
          console.log(data)
          this.router.navigate(['/analysis-details/'+data],{ queryParams:{lake:this.currentLake.id}})});



      }
        console.log("test")



      }

  ngOnInit(): void {

    this.getLake(this.route.snapshot.params.id);
    this.page = 1;
    this.page_size = 5;
    this.retrieveAnalysis();
  }

  getLake(id: string): void {
    this.lakesService.get(id)
    .subscribe(
      data => {
        this.currentLake = data;
      },
      error => {
        console.log(error);
      });
    }

    add_analysis(){
      const dialogRef = this.dialog.open(AnalysisAddComponent, {data: this.route.snapshot.params.id});
      dialogRef.afterClosed().subscribe(result => {
        if (result) this.retrieveAnalysis();
      });
    }

    delete_analysis(id: number){
      if(this.trashid==id){
        this.analysisService.delete(id)
        .subscribe(
          response => {
            this.retrieveAnalysis();
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

      modify_analysis(analysis: Analysis){
        this.currentAnalysis = Object.assign({}, analysis)
      }

      update_analysis(): void {
        this.analysisService.update(this.currentAnalysis.id, this.currentAnalysis)
        .subscribe(
          response => {
            this.retrieveAnalysis();
            this.currentAnalysis.id = null;
          },
          error => {
            console.log(error);
          });
        }

        change_page(page: number){
          this.page = (page<1)?1:(page>this.nbpages.length)?this.nbpages.length:page;
          this.retrieveAnalysis();
        }

        retrieveAnalysis(): void {
          this.analysisService.getAnalysis(this.page, this.page_size, this.route.snapshot.params.id)
          .subscribe(
            data => {
              this.analyzes = data.results;
              this.nbelement = data.count;
              // generate the pagination
              this.nbpages = Array(Math.ceil(this.nbelement/this.page_size)).fill(1).map((x,i)=>i+1);
              if (this.analyzes) {
                this.datenav = [];
                this.avg_ph = [];
                this.avg_temp = [];
                this.avg_conduc = [];
                for (let i = this.analyzes.length - 1; i>=0; i--){
                  let element = this.analyzes[i];
                  this.datenav.push(element.datenav);
                  this.avg_ph.push(element.avg_ph);
                  this.avg_temp.push(element.avg_temp);
                  this.avg_conduc.push(element.avg_conduc);
                };
              }
              this.ph_date = {
                tooltip: {
                  trigger: 'axis'
                },
                legend: {},
                toolbox: {
                  show: true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.datenav,
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value}'
                  }
                },
                series: [
                  {
                    name: 'PH ',

                    type: 'line',
                    data: this.avg_ph,

                  },
                ]
              };
              this.temp_date = {
                tooltip: {
                  trigger: 'axis'
                },
                legend: {},
                toolbox: {
                  show: true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.datenav,
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value} °C'
                  }
                },
                series: [
                  {
                    name: 'Temperature',

                    type: 'line',
                    data: this.avg_temp,

                  },
                ]
              };

              this.temp_conduc = {
                tooltip: {
                  trigger: 'axis'
                },
                legend: {},
                toolbox: {
                  show: true,
                  feature: {
                    dataZoom: {
                      yAxisIndex: 'none'
                    },
                    dataView: { readOnly: false },
                    magicType: { type: ['line', 'bar'] },
                    restore: {},
                    saveAsImage: {}
                  }
                },
                xAxis: {
                  type: 'category',
                  data: this.datenav,
                },
                yAxis: {
                  type: 'value',
                  axisLabel: {
                    formatter: '{value}'
                  }
                },
                series: [
                  {
                    name: 'Conductivity',

                    type: 'line',
                    data: this.avg_conduc,

                  },
                ]
              };
            },
            error => {
              console.log(error);
            }
          );



        }

      }
