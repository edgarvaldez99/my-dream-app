import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatusEnum } from 'src/app/enums/user-status.enum';
import { DialogData } from 'src/app/interfaces/dialog-data';


@Component({
  selector: 'app-add-evaluation-dialog',
  templateUrl: './add-evaluation-dialog.component.html',
  styleUrls: ['./add-evaluation-dialog.component.scss'],
})
export class AddEvaluationDialogComponent implements OnInit {

  title = '';
  msg = '';
  btn = '';
  btn2 = '';
  estados = [
    { estado: UserStatusEnum.ACTIVE },
    { estado: UserStatusEnum.INACTIVE }
  ];
  formGroup = this.formBuilder.group({
    nombreProyectoCtrl: ['', Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<AddEvaluationDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DialogData
  ) { }

  ngOnInit(): void {
    if (this.data.msg) {
      this.title = this.data.title;
      this.msg = this.data.msg;
      this.btn = this.data.btn;
      this.btn2 = this.data.btn2;
    }
  }

  openSnackBar(message: string, message2: string): void {
    this.snackBar.open(message, message2);
  }

  action(): void {
    /*const status = this.formGroup.value.statusCtrl;
    this.dialogRef.close({ accept: true, status });*/
  }

  close(): void {
    this.dialogRef.close({ accept: false});
  }
}
