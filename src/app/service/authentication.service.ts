import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

export class User {
  constructor(public status: string) {}
}

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  constructor(private httpClient: HttpClient,private spinner: NgxSpinnerService) {}
// Provide username and password for authentication, and once authentication is successful, 
//store JWT token in session
private jwt() {
  // debugger;
  let headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json' });
  //return new RequestOptions({ headers: headers });

  let options = {
    headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
  }
  return options;

}
  authenticate(username, password) {
    this.spinner.show();
    return this.httpClient
      .post<any>("http://localhost:8083/testSuiteAPIService/authenticate", { username, password },this.jwt())
      .pipe(
        map(userData => {
          sessionStorage.setItem("username", username);
          let tokenStr = "Bearer " + userData.token;
          sessionStorage.setItem("token", tokenStr);
          this.spinner.hide();
          return userData;
        })
      );
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem("username");
    
    return !(user === null);
  }

  logOut() {
    sessionStorage.removeItem("username");
  }
  register(loginInfo:{ username: string, password: string}){
    debugger;
        return this.httpClient.post<any>('http://localhost:8083/testSuiteAPIService/addUser', loginInfo)
          .pipe(map(result => {
            return result;
          }));
      } 
}
