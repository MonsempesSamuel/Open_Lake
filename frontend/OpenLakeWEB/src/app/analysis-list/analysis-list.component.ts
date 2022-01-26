import { Component, OnInit } from '@angular/core';
import { Analysis } from 'src/app/models/analysis.model';
import { AnalysisService } from '../services/analysis.service';


@Component({
  selector: 'app-analysis-list',
  templateUrl: './analysis-list.component.html',
  styleUrls: ['./analysis-list.component.scss']
})
export class AnalysisListComponent implements OnInit {

  analyzes?: Analysis[];
  currentAnalysis: Analysis = {};
  currentIndex = -1;
  title = '';


  constructor(private analyzesService: AnalysisService) { }

  ngOnInit(): void {
    this.retrieveAnalyzes();
  }

  retrieveAnalyzes(): void {
    this.analyzesService.getAll()
    .subscribe(
      data => {
        this.analyzes = data;
        console.log(data);
      },
      error => {
        console.log(error)
      }
    )
  }


}
