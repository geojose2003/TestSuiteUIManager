
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
export class AddPortalService {

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
    getvalueForDropdown(value,drop){
      let dropDownValue = {
        "id" : drop,
        "dropValue" : value
      }
      return this.httpClient
      .post<any>("http://localhost:8083/testSuiteAPIService/getvalueForDropdown", dropDownValue,this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide(); 
          
          return userData;
        })
      );
    }
    getvalueForDropdownPortal(value,drop,info){
      let dropDownValue = {
        "id" : drop,
        "dropValue" : value,
        "info" : info
      }
      return this.httpClient
      .post<any>("http://localhost:8083/testSuiteAPIService/getvalueForDropdown", dropDownValue,this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide(); 
          
          return userData;
        })
      );
    }
    addPortal(field){ 
        this.spinner.show();
        return this.httpClient
        .post<any>("http://localhost:8083/testSuiteAPIService/addPortal", field,this.jwt())
        .pipe(
          map(userData => {
            this.spinner.hide(); 
            return userData;
          })
        );

   }
   public editEachPortal(pid:number,browser) {
            console.log("browse"+browser);
            console.log("pid "+pid);
            
            this.spinner.show();
            return this.httpClient.post<any>(
              "http://localhost:8083/testSuiteAPIService/editPortalWithFields", pid, this.jwt())
              .pipe(
                map(userData => {
                  this.spinner.hide();
                 
                  console.log("userData "+userData);
                  return userData;
                })
              );
          }

} 
