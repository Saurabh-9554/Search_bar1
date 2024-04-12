import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LogsService } from '../services/logs.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-log-add-edit',
  templateUrl: './log-add-edit.component.html',
  styleUrls: ['./log-add-edit.component.css']
})
export class LogAddEditComponent implements OnInit {

  logForm:FormGroup;

  constructor(private _fb:FormBuilder, private _logService: LogsService, private _dialogRef:MatDialogRef<LogAddEditComponent>) { 
    this.logForm=this._fb.group({
      Date:'',
      Catagory:'',
      logs:'',
    })
  }

  onFormSubmit(){
    if(this.logForm.valid){
      this._logService.addLogs(this.logForm.value).subscribe({
        next: (val: any)=>{
          alert('logs added successfully');
          this._dialogRef.close();
        },  
        error:(err:any)=>{
          console.error(err);
        }
      })
    }
  }

  ngOnInit(): void {
  }

}
