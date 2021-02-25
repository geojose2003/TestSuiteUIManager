import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { HttpClientService, Portal } from "../service/httpclient.service";
import { Router } from '@angular/router';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';
import { FormGroup } from '@angular/forms';
import {  FormControl, FormBuilder, Validators } from '@angular/forms';
import {AddPortalService} from '../service/add-portal.service';
import { NgxSpinnerService } from "ngx-spinner";
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";
export class DropData {
  constructor(
    public id: number,
    public dropValue: string,
   
  ) {}
}
@Component({
  selector: "add-portals",
  templateUrl: "./add-portal.component.html",
  styleUrls: ['./add-portal.component.css']
})

export class AddPortalComponent implements OnInit {
  
  title = 'read-excel-in-angular8';
  storeData: any;
  csvData: any;
  jsonData: any;
  textData: any;
  htmlData: any;
  fileUploaded: File;
  worksheet: any;
  fields:any;
  sampleData:any;
  fieldName:any;
  sampleName:any;
  hide=true;
  userlist: any;
  values = ['AM', 'PM'];
  portalName = this.values[1];
  form: FormGroup = new FormGroup({
    portalName: new FormControl(''),
    categoryName: new FormControl(''), 
    moduleName: new FormControl(''),
    userNameForPortal: new FormControl(''),
    password: new FormControl(''),
    portalUrl: new FormControl(''),
    industry: new FormControl(''),
    clientName: new FormControl(''),
    navigate: new FormControl('')
  });
  file:File;
  filelist:any;
  arrayBuffer:any;
  public addFieldForm: FormGroup;
  formDialogBoxData:any=[];
  isExcelSelected:boolean=false;
  Industry: any = [];
  ClientName: any = []
  CategoryName: any = []
  PortalName: any =[]
  ModuleName: any =[]
  DropData: any=[];
  addFieldDisabled:boolean=false;
  addFieldsMessage="";
  isFieldAdded:boolean=false;
  addFieldModalEnabled:boolean=false;
  submitted:boolean=false;
  popUpMsg="";
  
  constructor(private httpClientService: HttpClientService,public addPortalService: AddPortalService,
    private router: Router,private spinner: NgxSpinnerService,private modalService: NgbModal,private formBuilder:FormBuilder) {}

  ngOnInit() {
    let defaultId = "selesaabbb";
   var portalName = 'sdsb';
   this.addFieldForm=this.formBuilder.group({
    FieldName: ['',Validators.required], 
    FieldType: ['',Validators.required],
    FieldInfo: ['',Validators.required],
    PortalId: ['',Validators.required],
    FieldPatterns: ['',Validators.required],
    TestData: ['',Validators.required],
   })
    this.form.controls['portalName'].setValue(defaultId);
      this.addPortalService.getvalueForDropdown('','industryLoadAll').subscribe((data)=>{
      if(data){
      this.userlist=data;
      for (let i = 0; i < data.length; i++) {
        let dropValue=this.userlist[i].dropValue;
         this.Industry.push(dropValue);
         
      }
      this.spinner.hide();
      }
    },(err)=>{
      console.log("failure"+err.log);
    })
  }

  uploadedFile(event,option) { 
    this.fileUploaded = event.target.files[0];
    if(option=='field'){
      alert(event.target.files[0].name)
      this.fieldName=event.target.files[0].name;
      }else{
        this.sampleName=event.target.files[0].name;
      }
    this.readExcel(option);
  }

  changeDrop(e,drop){
    this.spinner.show();
    var dropvalue=e.target.value;
    if(drop=='industry'){
    this.CategoryName=[];
    }else if(drop=='category'){
      this.ClientName=[];
    }else if(drop=='client'){
      this.PortalName=[];
    } 
    else if(drop=='portal'){
      this.ModuleName=[];
    }
    
    this.addPortalService.getvalueForDropdown(dropvalue,drop).subscribe((data)=>{
      if(data){
      this.userlist=data;
      for (let i = 0; i < data.length; i++) {
        let dropValue=this.userlist[i].dropValue;
       if(drop=='industry'){
        this.CategoryName.push(dropValue);
       }else if(drop=='category'){
        this.ClientName.push(dropValue);
       }
       else if(drop=='client'){
        this.PortalName.push(dropValue);
       }
       else if(drop=='portal'){
        this.ModuleName.push(dropValue);
       }
      }
      this.spinner.hide();
      }
    },(err)=>{
      console.log("failure"+err.log);
    })
  }

  changeDropPortal(e,drop){
    var info =this.form.get('clientName').value;
    console.log("info "+this.form.get('clientName').value);
    this.spinner.show();
    var dropvalue=e.target.value;
    if(drop=='industry'){
    this.CategoryName=[];
    }else if(drop=='category'){
      this.ClientName=[];
    }else if(drop=='client'){
      this.PortalName=[];
    } 
    else if(drop=='portal'){
      this.ModuleName=[];
    }
    
    this.addPortalService.getvalueForDropdownPortal(dropvalue,drop,info).subscribe((data)=>{
      if(data){
      this.userlist=data;
      for (let i = 0; i < data.length; i++) {
        let dropValue=this.userlist[i].dropValue;
       if(drop=='industry'){
        this.CategoryName.push(dropValue);
       }else if(drop=='category'){
        this.ClientName.push(dropValue);
       }
       else if(drop=='client'){
        this.PortalName.push(dropValue);
       }
       else if(drop=='portal'){
        this.ModuleName.push(dropValue);
       }
      }
      this.spinner.hide();
      }
    },(err)=>{
      console.log("failure"+err.log);
    })
  }

  readExcel(option) {
    alert("option"+option)
    let readFile = new FileReader();
    readFile.onload = (e) => {
      alert("hi")
      this.storeData = readFile.result;
      var data = new Uint8Array(this.storeData);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      this.worksheet = workbook.Sheets[first_sheet_name];
      readFile.readAsArrayBuffer(this.fileUploaded);
      this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
      this.jsonData = JSON.stringify(this.jsonData);
      const datas: Blob = new Blob([this.jsonData], { type: "application/json" });
      if(option=='field'){
      this.fields=this.jsonData;
      }else{
        this.sampleData=this.jsonData;
      }
      
    }
   
  }

  onFileChange(ev,option) {
    if(option=='fields'){
      this.fieldName=ev.target.files[0].name.substring(0, ev.target.files[0].name.lastIndexOf("."));
      }else{
        this.sampleName=ev.target.files[0].name.substring(0, ev.target.files[0].name.lastIndexOf("."))
      }
      
  let workBook = null;
  let jsonData = null;
  const reader = new FileReader();
  const file = ev.target.files[0];
  reader.onload = (event) => {
    const data = reader.result;
    workBook = XLSX.read(data, { type: 'binary' });
  var first_sheet_name = workBook.SheetNames[0];
    this.worksheet = workBook.Sheets[first_sheet_name];
    jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    const dataString = JSON.stringify(jsonData);
    if(option=='fields'){
     this.fields=dataString;
    }else{
      this.sampleData=dataString;
    }
    console.debug(dataString);
  }
  reader.readAsBinaryString(file);
  }

  readAsJson(option) {
    this.jsonData = XLSX.utils.sheet_to_json(this.worksheet, { raw: false });
    this.jsonData = JSON.stringify(this.jsonData);
    const data: Blob = new Blob([this.jsonData], { type: "application/json" });
    var fileName=null;
    if(option=='fields'){
        fileName=this.fieldName;
      }else{
        fileName=this.sampleName;
      }
   
    FileSaver.saveAs(data, fileName +"_"+ new Date().getTime() + '.json');
  }
  onClickSubmit(formData) {
    alert('Your Email is : ' + formData.email);
 }

 submit() {
  this.spinner.show();
   var formData={
     portalName:'',
     categoryName:'',
     moduleName:'',
     portalUrl:'',
     userNameForPortal:'',
     password:'',
     field:'',
     clientName:'',
     industry:'',
     navigate:'',
     sampleData:''
    }
   formData.portalName=this.form.get('portalName').value;
   formData.categoryName=this.form.get('categoryName').value;
   formData.moduleName=this.form.get('moduleName').value;
   formData.portalUrl=this.form.get('portalUrl').value;
   formData.userNameForPortal=this.form.get('userNameForPortal').value;
   formData.password=this.form.get('password').value;
   formData.field=this.fields;
   formData.clientName=this.form.get('clientName').value;
   formData.industry=this.form.get('industry').value;
   formData.navigate=this.form.get('navigate').value;
   formData.sampleData=this.sampleData;
  this.addPortalService.addPortal(formData).subscribe((data)=>{
    if(data){
      this.router.navigate(["/viewPortal"])
    }
  },(err)=>{
    console.log("failure"+err.log);
  })

 }

 onSaveClick(){
  this.popUpMsg="";
   this.submitted=false;
   if(!this.addFieldDisabled){
    this.submitted = true;
    if (this.addFieldForm.invalid) {
        return;
    }
  let sampleValue={"1":this.addFieldForm.get('FieldName').value,"2":this.addFieldForm.get('FieldType').value,"3":this.addFieldForm.get('FieldInfo').value,"4":this.addFieldForm.get('PortalId').value,"5":this.addFieldForm.get('FieldPatterns').value,"6":this.addFieldForm.get('TestData').value};
  let fieldValue=[{"1":"fieldName","2":"fieldType","3":"fieldInfo","4":"portalId","5":"fieldPatterns","6":"testData"}]
  this.formDialogBoxData.push(sampleValue);
  this.fields=JSON.stringify(this.formDialogBoxData);
  this.sampleData=JSON.stringify(fieldValue);
  this.addFieldModalEnabled=false;
  this.addFieldsMessage="Customized add field details saved Successfully !!!";
  this.isFieldAdded=true;
  this.addFieldForm.reset();
  }else if(this.fields&&this.sampleData){
    this.addFieldsMessage="Add field details saved Successfully !!!";
    this.isFieldAdded=true;
    this.addFieldModalEnabled=false;
    this.addFieldForm.enable();
    this.addFieldDisabled=false;
  }else{
    this.popUpMsg="Please enter valid file details"
  }
 }

 addfile(event,text)     
  { 
  this.popUpMsg="";
  this.addFieldsMessage="Details has been changed in add fields.Please enter the valid details to execute successfully";
  this.addFieldForm.enable();
  this.addFieldDisabled=false;
  this.file= event.target.files[0]; 
  if(this.file){
    this.addFieldForm.reset();
    this.addFieldForm.disable();
    this.addFieldDisabled=true;
  let fileReader = new FileReader();    
  fileReader.readAsArrayBuffer(this.file);     
  fileReader.onload = (e) => {    
      this.arrayBuffer = fileReader.result;    
      var data = new Uint8Array(this.arrayBuffer);    
      var arr = new Array();    
      for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);    
      var bstr = arr.join("");    
      var workbook = XLSX.read(bstr, {type:"binary"});    
      var first_sheet_name = workbook.SheetNames[0];    
      var worksheet = workbook.Sheets[first_sheet_name]; 
      var arraylist = XLSX.utils.sheet_to_json(worksheet,{raw:false});  
      let dataString=JSON.stringify(arraylist);
      if(text=='fields'){
        this.fields=dataString;
       }else{
         this.sampleData=dataString;
       }
  }
 }
 if(text=='fields' && !this.file){
   this.fields="";
 }else if(text=='sample' && !this.file){
   this.sampleData="";
 }  
}

onModalResetClick(element,element1){
  element.value='';
  element1.value='';
  this.addFieldForm.reset();
  this.addFieldForm.enable();
  this.fields="";
  this.sampleData="";
  this.submitted=false;
}

onModalPopUpOpen(){
this.addFieldModalEnabled=true;
this.submitted=false;
}

onModalCloseClick(){
  this.addFieldModalEnabled=false;
  this.submitted=false; 
}

get f() { return this.addFieldForm.controls; }
}
