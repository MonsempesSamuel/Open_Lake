import { Component, OnInit, Inject } from '@angular/core';
import { LogoutPopupComponent } from 'src/app/logout-popup/logout-popup.component';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA, MatDialogConfig } from '@angular/material/dialog';
import { LakesService } from 'src/app/services/lakes.service';
import { AuthService } from 'src/app/services/auth.service';
import {LoginPopupComponent} from "../login-popup/login-popup.component";
import {FormControl} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { Lake } from 'src/app/models/lake.model';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
//import {MatAutocompleteModule} from 'src/app.module.ts'
import {RegisterPopupComponent} from "../register-popup/register-popup.component";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  lake_name: string
  myControl = new FormControl();
  options!: string[];
  filteredOptions?: Observable<string[]>;
  lakes!: Lake[];
  listlakes: string[];
  currentLake?: Lake = {};
  trashid?: any;
  nbelement?: any;
  nbpages?: any[];
  page?: any;
  page_size?: any;
  data: any;
  listid_lake: string[];
  id_lake: string;
  //


  constructor(private router: Router, private lakesService: LakesService, public dialog: MatDialog, public authService: AuthService) {
    this.listlakes = [];
    this.lake_name = ""
    this.listid_lake = [];
    this.id_lake = ""
    //this.Router =
   }

  async ngOnInit(): Promise<void> {
    this.page = 1;
    this.page_size = 5000000000000;
    this.options = await this.retrieveLakename();
    // console.log(this.options);
    this.filteredOptions = this.myControl.valueChanges.pipe(
    startWith(''),
    map(value => this._filter(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase()!;

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  Registerpopup(){
    this.dialog.open(RegisterPopupComponent,{
      autoFocus: false
    });
  }
  Loginpopup(){
    this.dialog.open(LoginPopupComponent,{
      autoFocus: false
    });
  }

  Searchbar(){
      var element = document.getElementById("searchbar");
      if(element && element.className == "dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"){
        element.className = "dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in show"
      }
      else if(element){
        element.className = "dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in"
      }
  }



  ToggleSide(){
      var element = document.getElementById("accordionSidebar");
      if(element && element.className == "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"){
        element.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion toggled"
      }
      else if(element){
        element.className = "navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
      }
  }

  Disconnect(){
    this.dialog.open(LogoutPopupComponent,{
      autoFocus: false
    });
  }



  async retrieveLakename() :Promise<string[]> {
    const data = await this.lakesService.getLakes(this.page, this.page_size).pipe(first()).toPromise();
    this.lakes = data.results!;
    // console.log(this.lakes);
    this.nbelement = data.count;
    // generate the pagination
    this.nbpages = Array(Math.ceil(this.nbelement/this.page_size)).fill(1).map((x,i)=>i+1);
    this.listid_lake = this.lakes.map(x=>x.id)
    this.listlakes = this.lakes.map(x=> {
      if (x.name===undefined)
        return '';
      return x.name;
    });

     // this.options = this.listlakes!;
     //
     //console.log(this.listlakes);
     //console.log(this.listlakes);
     return this.listlakes;
   }
   onclicksearch(): void{
     console.log(this.lake_name);
     console.log(this.listid_lake);
     if (this.listlakes.includes(this.lake_name))
        this.id_lake = this.listid_lake[this.listlakes.indexOf(this.lake_name)]
        console.log(this.id_lake)

        this.router.navigate(['/lake-details/'+this.id_lake])



   }
}
