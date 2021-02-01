
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { environment } from 'src/environments/environment';
import { Injectable, ɵConsole } from '@angular/core';
import { BehaviorSubject, Observable, of ,throwError} from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

@Injectable({
  providedIn: 'root'
})
export class SignUpService {

    baseUrl: string = "http://localhost:8083/";
    fields : string ="";
    constructor(private router: Router ,private httpClient: HttpClient,private spinner: NgxSpinnerService) { }
    private jwt() {

      let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
      //return new RequestOptions({ headers: headers });
      var token = localStorage.getItem("token")
      let options = {};
      if (token) {
        options = {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json' ,
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
    getvalueForRegistration(value,drop){
      let dropDownValue = {
        "id" : drop,
        "dropValue" : value
      }
      return this.httpClient
      .post<any>("http://localhost:8083/testSuiteAPIService/getvalueForRegistration", dropDownValue,this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide(); 
          
          return userData;
        })
      );
    }
    
    
} 
