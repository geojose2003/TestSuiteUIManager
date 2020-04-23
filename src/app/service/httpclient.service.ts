import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";

export class Portal {
  constructor(
    public portalName: string,
    public moduleName: string,
    public field: string,
    public sampleData: string,
    public portalUrl: string
  ) {}
}

@Injectable({
  providedIn: "root"
})
export class HttpClientService {
  constructor(private httpClient: HttpClient) {}

  getPortalList() {
    return this.httpClient.get<Portal[]>("http://localhost:8083/viewPortalList");
  }

  public deletePortal(employee) {
    return this.httpClient.delete<Portal>(
      "http://localhost:8083/deletePortalList" + "/" + employee.empId
    );
  }

  public createPortal(employee) {
    return this.httpClient.post<Portal>(
      "http://localhost:8083/createPortal",
      employee
    );
  }
}
