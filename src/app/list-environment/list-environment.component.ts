import { Component, Input, OnInit } from '@angular/core';
import { EmpDataService } from 'app/service/emp-data.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TransitionCheckState } from '@angular/material/checkbox';
import{Location}from '@angular/common';

@Component({
  selector: 'app-list-environment',
  templateUrl: './list-environment.component.html',
  styleUrls: ['./list-environment.component.css']
})
export class ListEnvironmentComponent implements OnInit {
  public envname:string = '';
  
  constructor(private empData: EmpDataService, private router: Router, private _location: Location) {
    this.envname=this.router.getCurrentNavigation().extras.state.envName;
  }
  
  environmentsCopy: any;
  searchText: string = '';
  selectedItem: any;
  environments:any[];
  labData:any;
  value:false;

  getData(){
    this.environments = this.empData.getSelectedEnvironment();
    this.empData.getLabData(this.environments[0].labData).subscribe(res=>{
      this.labData=res;
    })
    this.value=this.empData.getValue();
    console.warn(this.value);
    // console.warn(this.environments[0].labData);
    this.environmentsCopy = [...this.environments];
    let env = this.resultArray.name.split('(')[0];
    this.empData.Labenvironment(env).subscribe((data: any)=> {
      console.log(data)
    })
  }

  // initialShowEnv(){
  //   this.empData.initialShowEnvironment().subscribe(res=>{
  //     this.environments=res;
  //   })
  //   this.environmentsCopy = [...this.environments];
  // }
  initialShowData(){
    this.empData.initialShowData().subscribe(res=>{
      this.labData=res;
    });
    // this.initialShowEnv();
    setTimeout(() => {this.getData();}, 200);
  }

  ngOnInit(): void {
    this.initialShowData();
    
    // setTimeout(() => {this.initialShowData();}, 1000);
    // this.getData();
    // console.log("Service called")
    // console.log(this.environments);
  }

  filter() {
    this.environments = this.environmentsCopy;
    let environmentsNew = this.environments.filter((target: any) => {
      return target.labData.toLowerCase().includes(this.searchText.toLowerCase())
    });
    this.environments = environmentsNew;
    }
    backClicked() {
      this._location.back();
    }

    //Back Button
    onEnvClick() {
      debugger;
      this.router.navigateByUrl('/typography');
      this.backClicked();
    }
  onMenuSelected(event: any) {
    this.selectedItem = this.environmentsCopy.find((target: any) => {
      return target.labData.toLowerCase().includes(event.value.toLowerCase())
    });
    // console.warn(this.selectedItem.labData);
    this.labData=this.empData.getLabData(this.selectedItem.labData).subscribe(res=>{
      this.labData=res;
    })
  }
}

