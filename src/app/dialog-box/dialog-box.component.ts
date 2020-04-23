import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogBoxService } from '../service/dialog-box.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './dialog-box.component.html',
  styleUrls: ['./dialog-box.css']
})
export class DialogBoxComponent implements OnInit {

  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder,private router: Router,
  private dialogRef: MatDialogRef<DialogBoxComponent>,
  private dialogService: DialogBoxService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this.form = this._formBuilder.group({
      PortalId: [this.data.portalID],
      PortalName: [ this.data.portalName, [Validators.required]],
      ModuleName: [ this.data.moduleName, [Validators.required]],
      Field: [ this.data.field, [Validators.required]],
      SampleData: [ this.data.sampleData, [Validators.required]],
      PortalUrl: [ this.data.portalUrl, [Validators.required]],
      ClientName: [ this.data.clientName, [Validators.required]],
      Navigate: [ this.data.navigate, [Validators.required]],
      Industry: [ this.data.industry, [Validators.required]]
    });
  }

  onSubmit() {
    
      this.dialogService.addContact(this.form.value);
      var formData: any = new FormData();
     
      formData.append("portalID",this.form.get('PortalId').value);
      formData.append("portalName",this.form.get('PortalName').value);
      formData.append("moduleName",this.form.get('ModuleName').value);
      formData.append("field",this.form.get('Field').value);
      formData.append("sampleData",this.form.get('SampleData').value);
      formData.append("portalUrl",this.form.get('PortalUrl').value);
      formData.append("clientName",this.form.get('ClientName').value);
      formData.append("navigate",this.form.get('Navigate').value);
      formData.append("industry",this.form.get('Industry').value);
       
  this.dialogService.editPortal(formData).subscribe((data)=>{
    if(data){
      window.location.reload()
      this.router.navigate(["/viewPortal"])
    }
  },(err)=>{
    console.log("failure"+err.log);
  })

      this.dialogRef.close();
    
  }

}