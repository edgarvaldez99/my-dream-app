import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { StatusEnum } from 'src/app/enums/status.enum';
import { DialogData } from 'src/app/interfaces/dialog-data';

@Component({
  selector: 'app-active-inactive-dialog',
  templateUrl: './active-inactive-dialog.component.html',
  styleUrls: ['./active-inactive-dialog.component.scss']
})
export class ActiveInactiveDialogComponent implements OnInit {
  title = '';
  msg = '';
  btn = '';
  btn2 = '';
  status?: string;
  estados: Array<{ estado: StatusEnum }> = [
    { estado: StatusEnum.ACTIVE },
    { estado: StatusEnum.INACTIVE }
  ];
  formGroup = this.formBuilder.group({
    status: [StatusEnum.INACTIVE, Validators.required]
  });

  constructor(
    private dialogRef: MatDialogRef<ActiveInactiveDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
  ) { }

  ngOnInit(): void {
    if (this.data.msg) {
      this.title = this.data.title;
      this.msg = this.data.msg;
      this.btn = this.data.btn;
      this.btn2 = this.data.btn2;
      this.status = this.data.item;
    }
    this.formGroup.get('status')?.setValue(this.status ?? '');
  }

  openSnackBar(message: string, message2: string): void {
    this.snackBar.open(message, message2);
  }

  action(): void {
    const status = this.formGroup.value.status;
    this.dialogRef.close({ accept: true, status });
  }

  close(): void {
    this.dialogRef.close({ accept: false });
  }
}
