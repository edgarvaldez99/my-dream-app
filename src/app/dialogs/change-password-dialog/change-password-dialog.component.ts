import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password-validator';

@Component({
  selector: 'app-change-password-dialog',
  templateUrl: './change-password-dialog.component.html',
  styleUrls: ['./change-password-dialog.component.scss']
})
export class ChangePasswordDialogComponent implements OnInit {

  isLoading = false;

  showPassword = false;
  showNewPassword = false;
  showRepeatPassword = false;
  user = this.authService.loggedUser();
  formGroup = this.formBuilder.group(
    {
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      newPasswordConfirm: ['', Validators.required]
    },
    {
      validators: confirmPasswordValidator('newPassword', 'newPasswordConfirm')
    },
  );

  constructor(
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void { }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Operación Exitosa');
  }

  updatePass(): void {
    if (this.user?.id) {
      this.isLoading = true;
      this.userService.changePass(this.user.id, this.formGroup.value).subscribe(
        () => {
          this.formGroup.reset();
          this.openSnackBar('Tu contraseña se ha modificado correctamente');
          this.close(false);
        },
        () => { },
        () => (this.isLoading = false)
      );
    }
  }
}
