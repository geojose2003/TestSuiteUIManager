import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogBoxService } from '../service/dialog-box.service';
import { Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './newFieldDialog-box.component.html',
  styleUrls: ['./newFieldDialog-box.css']
})
export class NewFieldDialogBoxComponent implements OnInit {

  public form: FormGroup;

  constructor(private _formBuilder: FormBuilder,private router: Router,
  private dialogRef: MatDialogRef<NewFieldDialogBoxComponent>,
  private dialogService: DialogBoxService,
  @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
   }

  ngOnInit() {
    this.form = this._formBuilder.group({
      fieldID: [this.data.fieldID],
      fieldName: [ this.data.fieldName],
      fieldType: [ this.data.fieldType],
      fieldInfo: [ this.data.fieldInfo, [Validators.required]],
      portalID: [ this.data.portalID],
      fieldNamePatterns: [ this.data.fieldNamePatterns, [Validators.required]],
      testData: [ this.data.testData, [Validators.required]]     
    });
  }

  onSubmit() {
    
      //this.dialogService.addContact(this.form.value);
      var formData: any = new FormData();
     
  
      formData.append("fieldID",this.form.get('fieldID').value);
      formData.append("fieldName",this.form.get('fieldName').value);
      formData.append("fieldType",this.form.get('fieldType').value);
      formData.append("fieldInfo",this.form.get('fieldInfo').value);
      formData.append("portalID",this.form.get('portalID').value);
      formData.append("fieldNamePatterns",this.form.get('fieldNamePatterns').value.toLowerCase());
      formData.append("testData",this.form.get('testData').value);
             
  this.dialogService.editNewField(formData).subscribe((data)=>{
    if(data){
      window.location.reload()
      this.router.navigate(["/adminPage"])
    }
  },(err)=>{
    console.log("failure"+err.log);
  })

      this.dialogRef.close();
    
  }

}
