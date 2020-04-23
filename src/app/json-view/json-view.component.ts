import { Component ,ViewChild,OnInit} from "@angular/core";
import { Router } from '@angular/router';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: "jsonView",
    templateUrl: "./json-view.component.html",
    styleUrls: ["./json-view.component.css"]
  })
  export class JsonViewComponent implements OnInit {
    constructor(
      private router: Router,public route: ActivatedRoute) {}
      data :any;
    ngOnInit() {
      this.route.params.subscribe(
        v => {
        console.log(v)
        this.data = v;
        console.log(this.data)
       
        });
    }
  
  
    get code () {
      return JSON.stringify(this.data, null, 2);
    }
  
    set code (v) {
      try{
        this.data = JSON.parse(v);
      }
      catch(e) {
        console.log('error occored while you were typing the JSON');
      };
    }
  }