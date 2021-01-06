import { Component ,ViewChild,OnInit} from "@angular/core";
import { ViewPortalService, Portal } from "../service/view-portal.service";
import { DialogBoxService } from "../service/dialog-box.service";
import { DialogBoxComponent} from "../dialog-box/dialog-box.component";
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import {  FormControl, FormBuilder, Validators } from '@angular/forms';
import {MatTableDataSource, MatSort,MatDialog ,MatPaginator} from '@angular/material';

export class ImageLocation {
  constructor(
    public pathId: number,
    public portalID: number,
    public imgPath: string,
    public folderName: string,
    public imageName: string
    
  ) {}
}
@Component({
  selector: "app-portals",
  templateUrl: "./view-portal.component.html"
})

export class ViewPortalComponent implements OnInit {
  form: FormGroup = new FormGroup({
    browser: new FormControl('')})
  portal: Portal[];
  imgList:any;
  imageLocation: ImageLocation[];
  browservalue="Chrome"
  Browser: any = ['FireFox']
  hide=true;
  isPopupOpened = true;
  Imagepath: any=[]
  displayedColumns: string[] = ['PortalID','BusinessUnit','SubBusinessUnit','ClientName','PortalName', 'PortalUrl','ModuleName', 'Fields','Status','Result','Run'];
  portalInfo = new MatTableDataSource(this.portal);

  constructor(private service: ViewPortalService,private dialog: MatDialog,private router: Router,
    private dialogService: DialogBoxService) {}
  @ViewChild(MatSort,{static: true}) sort : MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;
  _contactList: Portal[] = [];
  
  ngOnInit() {
   
    this.service.getPortalList().subscribe(stream => {
      this.portalInfo = new MatTableDataSource(stream);
      this._contactList.push(stream);
  });
  this.portalInfo.paginator = this.paginator;
    this.portalInfo.sort = this.sort;
  }
  changeDrop(e,drop){
    var dropvalue=e.target.value;
    this.browservalue=dropvalue;
    console.log(this.browservalue)
  }
  editPortal(id: number) {
    this.isPopupOpened = true;
    const contact = this.service.getAllPortalList().find(c => c.portalID === id);

    const dialogRef = this.dialog.open(DialogBoxComponent, {
      data: contact
    });


    dialogRef.afterClosed().subscribe(result => {
      this.isPopupOpened = false;
    });
  } 

  ngAfterViewInit (){
    this.portalInfo.sort = this.sort;
  }
  applyFilter(filterValue : string){
    this.portalInfo.filter=filterValue.trim().toLowerCase();
  }

  handleSuccessfulResponse(response) {
    this.portal = response;
  }
  getField(portal,field){
    this.service.getField(portal,field).subscribe((data)=>{
      if(data){
      
        this.router.navigate(["/jsonView",data])
      }
    },(err)=>{
      console.log("failure"+err.log);
    });
}

deletPortal(portal): void {
  if(confirm("Are you sure to delete ")) {
    this.service.deletePortal(portal).subscribe((data)=>{
      if(data){
        window.location.reload()
        this.router.navigate(["/viewPortal"])
      }
    },(err)=>{
      console.log("failure"+err.log);
    });
  }
  }
  navigatePortal(portal): void {

    this.service.navigatePortal(portal,this.browservalue).subscribe((data)=>{
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
