
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
    addPortal(field: FormData){ 
        let portal = {
          "portalName" : field.get("portalName").toString(),
          "moduleName" : field.get("moduleName").toString(),
          "portalUrl" : field.get("portalUrl").toString(),
          "field" : field.get("field").toString(),
          "sampleData" : field.get("sampleData").toString(),
          "clientName" : field.get("clientName").toString(),
          "industry" : field.get("industry").toString(),
          "navigate" : field.get("navigate").toString()
         
        };
        this.spinner.show();
        return this.httpClient
        .post<any>("http://localhost:8083/testSuiteAPIService/addPortal", portal,this.jwt())
        .pipe(
          map(userData => {
            this.spinner.hide(); 
            return userData;
          })
        );

          }

}