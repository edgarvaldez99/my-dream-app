import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password-dialog',
  templateUrl: './forgot-password-dialog.component.html',
  styleUrls: ['./forgot-password-dialog.component.scss']
})
export class ForgotPasswordDialogComponent implements OnInit {
  title = '';
  msg = '';
  btn = '';
  btn2 = '';
  alertStatus = false;
  sendMail = false;
  isLoading = false;
  message = 'Se envió un mail con los pasos a seguir a su correo';
  formGroup = this.formBuilder.group({
    usernameCtrl: ['', Validators.required]
  });

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService,
    private dialogRef: MatDialogRef<ForgotPasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) { }

  ngOnInit(): void {
    if (this.data.msg) {
      this.title = this.data.title;
      this.msg = this.data.msg;
      this.btn = this.data.btn;
      this.btn2 = this.data.btn2;
    }
  }

  forgot(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      this.alertStatus = true;
      this.message = 'Campo obligatorio';
      return;
    }
    this.isLoading = true;
    this.userService.forgotPass(this.formGroup.value.usernameCtrl).subscribe(resp => {
      this.alertStatus = false;
      this.isLoading = false;
      this.sendMail = true;
      this.message = 'Se envió un mail con los pasos a seguir a su correo';
      this.btn2 = 'CERRAR';
    }, error => {
      console.log(error);
      this.isLoading = false;
      this.alertStatus = true;
      this.message = 'Usuario no encontrado';
    });

    // this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }

}
