import { Component, OnInit } from '@angular/core';
import { EmpDataService } from 'app/service/emp-data.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-list-environment',
  templateUrl: './list-environment.component.html',
  styleUrls: ['./list-environment.component.css']
})
export class ListEnvironmentComponent implements OnInit {

  resultArray: any;
  constructor(private empData: EmpDataService) {
    this.resultArray = empData.getSelectedEnvironment();
    //   console.log(this.resultArray)
    //    this.resultArray = Object.keys(this.resultArray).map(index => {
    //     let envList = this.resultArray[index];
    //     return {
    //       index: envList
    //     };
    // });
    console.warn(this.resultArray);
    console.warn(typeof this.resultArray);
    console.warn((this.resultArray).childs);
  }
  environments = [
    {
      "Name": "Vishal Babu Meriga",
      childData: [
        {
        "title":"jask",
      }
      ]
    },
    {
      "Name": "Dhiraj Kumar Bairagi"
    },
    {
      "Name": "Shaik Karimulla"
    }
  ];
  environmentsCopy: any;
  searchText: string = '';
  selectedItem: any;
  ngOnInit(): void {
    this.environmentsCopy = [...this.environments];
    let env = this.resultArray.name.split('(')[0];
    this.empData.Labenvironment(env).subscribe((data: any)=> {
      console.log(data)
    })
  }
  
  
  filter(){
    this.environments = this.environmentsCopy;
    let environmentsNew = this.environments.filter((target: any) => {
      return target.Name.toLowerCase().includes(this.searchText.toLowerCase())
      console.log("File is working");
    });
    this.environments = environmentsNew;
  }

  onMenuSelected(event: any) {
    this.selectedItem = this.environmentsCopy.find((target: any) => {
      return target.Name.toLowerCase().includes(event.value.toLowerCase())
    });
    console.warn(this.selectedItem);
  }
}
