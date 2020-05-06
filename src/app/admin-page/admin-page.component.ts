import { Component ,ViewChild,OnInit} from "@angular/core";
import { AdminPageService, NewFields } from "../service/admin-page.service";
import { DialogBoxService } from "../service/dialog-box.service";
import { NewFieldDialogBoxComponent} from "../newFieldDialog-box/newFieldDialog-box.component";
import { Router } from '@angular/router';
import {MatTableDataSource, MatSort,MatDialog ,MatPaginator} from '@angular/material';


@Component({
  selector: "app-portals",
  templateUrl: "./admin-page.component.html",
  styleUrls: ["./admin-page.component.css"]
})
export class AdminPageComponent implements OnInit {
  newField: NewFields[];
  
  isPopupOpened = true;
  displayedColumns: string[] = ['fieldID','fieldName','fieldType','fieldInfo', 'portalID', 'fieldNamePatterns','testData','delete','edit'];
  fieldInfo = new MatTableDataSource(this.newField);

  constructor(private service: AdminPageService,private dialog: MatDialog,private router: Router,
    private dialogService: DialogBoxService) {}
  @ViewChild(MatSort,{static: true}) sort : MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  _newFieldList: NewFields[] = [];
  
  ngOnInit() {
   
    this.service.getNewFieldList().subscribe(stream => {
      this.fieldInfo = new MatTableDataSource(stream);
      this._newFieldList.push(stream);
  });
  this.fieldInfo.paginator = this.paginator;
    this.fieldInfo.sort = this.sort;
  }
  editNewField(id: number) {
    this.isPopupOpened = true;
    const fieldDtls = this.service.getAllFieldList().find(c => c.fieldID === id);

    const dialogRef = this.dialog.open(NewFieldDialogBoxComponent, {
      data: fieldDtls
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  } 

  ngAfterViewInit (){
    this.fieldInfo.sort = this.sort;
  }
  applyFilter(filterValue : string){
    this.fieldInfo.filter=filterValue.trim().toLowerCase();
  }

  handleSuccessfulResponse(response) {
    this.newField = response;
  }
  getField(newField,field){
    this.service.getField(newField,field).subscribe((data)=>{
      if(data){
      
        this.router.navigate(["/jsonView",data])
      }
    },(err)=>{
      console.log("failure"+err.log);
    });
}
deleteNewField(id: number): void {
  this.service.deleteNewField(id).subscribe((data)=>{
    if(data){
      window.location.reload()
      this.router.navigate(["/viewPortal"])
    }
  },(err)=>{
    console.log("failure"+err.log);
  });
}
  
}
export interface PeriodicElement {
  portalId: number;
  portalName: string;
  moduleName: string;
  fields: string;
  action: string;
}


