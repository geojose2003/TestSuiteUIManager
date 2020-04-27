import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import {SpinnerService} from "../service/spinner.service"
import { NgxSpinnerService } from "ngx-spinner";

export class Portal {
  constructor(
    public portalID: number,
    public portalName: string,
    public portalUrl: string,
    public moduleName: string,
    public field: string,
    public sampleData: string,
    public industry: string,
    public clientName: string,
    public navigate: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class ViewPortalService {
  constructor(private httpClient: HttpClient,private spinner: NgxSpinnerService) {}
  _contactList: Portal[] = [];
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
  getPortalList() {
    this.spinner.show();
    return this.httpClient
        .post<any>("http://localhost:8083/testSuiteAPIService/viewListOfPortal", this.jwt())
        .pipe(
          map(userData => {
            this._contactList=userData;
            this.spinner.hide();
            return userData;
          })
        );
  }
  getAllPortalList() {
    return this._contactList;
  }
  getField(portals,field){
    let portal = {
      "portalID":portals.portalID,
      "portalName" : portals.portalName,
      "moduleName" : portals.moduleName,
      "field" : portals.field,
      "portalUrl" : portals.portalUrl,
      "sampleData" : portals.sampleData,
      "clientName" : portals.clientName,
      "navigate" : portals.navigate,
      "industry" : portals.industry
     
    };

    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/getField", portal, this.jwt())
      .pipe(
        map(userData => {
         
          this.spinner.hide();
          return userData;
        })
      );
  }
  
  public deletePortal(portals) {
    let portal = {
      "portalID":portals.portalID,
      "portalName" : portals.portalName,
      "moduleName" : portals.moduleName,
      "field" : portals.field,
      "portalUrl" : portals.portalUrl,
      "sampleData" : portals.sampleData,
      "clientName" : portals.clientName,
      "navigate" : portals.navigate,
      "industry" : portals.industry
      
      
    };
    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/deltePortal", portal, this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide();
          return userData;
        })
      );
  }

  public navigatePortal(portals) {
    let portal = {
      "portalID":portals.portalID,
      "portalName" : portals.portalName,
      "moduleName" : portals.moduleName,
      "field" : portals.field,
      "portalUrl" : portals.portalUrl,
      "sampleData" : portals.sampleData,
      "clientName" : portals.clientName,
      "navigate" : portals.navigate,
      "industry" : portals.industry
      
      
    };
    this.spinner.show();
    return this.httpClient.post<any>(
      "http://localhost:8083/testSuiteAPIService/navigatePortal", portal, this.jwt())
      .pipe(
        map(userData => {
          this.spinner.hide();
          return userData;
        })
      );
  }

  public createPortal(employee) {
    return this.httpClient.post<Portal>(
      "http://localhost:8083/createPortal",
      employee
    );
  }
}
