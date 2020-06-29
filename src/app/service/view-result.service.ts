import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import {SpinnerService} from "../service/spinner.service"
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
 
export class ViewResultService {

  showSpinner: boolean;
  constructor(private httpClient: HttpClient,private spinner: NgxSpinnerService) { }
  private jwt() {

    let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
    //return new RequestOptions({ headers: headers });
    var token = localStorage.getItem("token")
    let options = {};
    if (token) {
      options = {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json' ,
          'x-access-token':token,
          'Authorization':token
        }
      }
    }
    else {
      options = {
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      }
    }
    return options;

  }
  viewResult(field){
    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/viewResult", field, this.jwt())
      .pipe(
        map(userData => {
         
          this.spinner.hide();
          return userData;
        })
      );
  }
  
     
}    
const Imagesdelatils = [    
  { "id": 1, "brand": "Apple", "url": "assets/Images/1.jpg" },    
  { "id": 2, "brand": "Apple", "url": "assets/Images/2.jpg" }
]


