import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStatusEnum } from 'src/app/enums/user-status.enum';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { User } from 'src/app/interfaces/user';

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
  user: User | undefined;
  estados: Array<{ estado: UserStatusEnum }> = [
    { estado: UserStatusEnum.ACTIVE },
    { estado: UserStatusEnum.INACTIVE }
  ];
  formGroup = this.formBuilder.group({
    statusCtrl: [UserStatusEnum.INACTIVE, Validators.required]
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
      this.user = this.data.user;
    }
    this.showdata();
  }

  showdata(): void {
    const status = this.user?.status ?? '';
    this.formGroup.get('statusCtrl')?.setValue(status);
  }

  openSnackBar(message: string, message2: string): void {
    this.snackBar.open(message, message2);
  }

  action(): void {
    const status = this.formGroup.value.statusCtrl;
    this.dialogRef.close({ accept: true, status });
  }

  close(): void {
    this.dialogRef.close({ accept: false});
  }
}
