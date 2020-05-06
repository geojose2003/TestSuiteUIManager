import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import {SpinnerService} from "../service/spinner.service"
import { NgxSpinnerService } from "ngx-spinner";

export class NewFields {
  constructor(
    public fieldID: number,
    public fieldName: string,
    public fieldType: string,
    public fieldInfo: string,
    public portalID: number,
    public fieldNamePatterns: string,
    public testData: string,
    public userId: number,
    public navigate: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class AdminPageService {
  constructor(private httpClient: HttpClient,private spinner: NgxSpinnerService) {}
  _newFieldList: NewFields[] = []; 
  showSpinner: boolean;
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
  getNewFieldList() {
    this.spinner.show();
    return this.httpClient
        .post<any>("http://localhost:8083/testSuiteAPIService/viewNewFieldsList", this.jwt())
        .pipe(
          map(userData => {
            this._newFieldList=userData;
            this.spinner.hide();
            return userData;
          })
        );
  }
  getAllFieldList() {
    return this._newFieldList;
  }
  getField(newFields,field){
    let newField = {
      "fieldID":newFields.fieldID,
      "fieldName" : newFields.fieldName,
      "fieldType" : newFields.fieldType,
      "fieldInfo" : newFields.fieldInfo,
      "portalID" : newFields.portalID,
      "fieldNamePatterns" : newFields.fieldNamePatterns,
      "testData" : newFields.testData,
      "userId" : newFields.userId,
      "userName" : newFields.userName
     
    };

    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/getField", newField, this.jwt())
      .pipe(
        map(userData => {
         
          this.spinner.hide();
          return userData;
        })
      );
  }
  
  public deleteNewField(id) {
    
    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/deleteNewField", id, this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide();
          return userData;
        })
      );
  }

}
