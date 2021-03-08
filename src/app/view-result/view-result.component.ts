import { Component, OnInit } from '@angular/core';
import {ViewResultService} from '../service/view-result.service'
import { from } from 'rxjs';
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';
import {ImageLocation} from '../view-portal/view-portal.component'
import { ViewPortalService } from "../service/view-portal.service";
@Component({
  selector: 'app-view-result',
  templateUrl: './view-result.component.html',
  styleUrls: ['./view-result.component.scss']
})
export class ViewResultComponent implements OnInit {
  constructor(private imageService: ViewResultService, private router: Router,public route: ActivatedRoute) {    
      
  }
  data :any;
   showSpinner: boolean;
  imageLocation: ImageLocation[] = [];
  ImageList: any = [];
  imgList:any;
  folderName :any;
  ngOnInit() {
    this.route.queryParams.subscribe(
      v => {
        console.log("dsfgnldngf+v"+v['q'])
        this.folderName=v['q'];
      });
      this.imageService.viewResult(this.folderName).subscribe((data)=>{
        if(data){
          this.imgList=data;
        }
      },(err)=>{
        console.log("failure"+err.log);
      });
   
  }
  

}
