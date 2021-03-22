import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleEnum } from 'src/app/enums/role.enum';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { confirmPasswordValidator } from 'src/app/validators/confirm-password-validator';

@Component({
  selector: 'app-admin-add-user-dialog',
  templateUrl: './admin-add-user-dialog.component.html',
  styleUrls: ['./admin-add-user-dialog.component.scss']
})
export class AdminAddUserDialogComponent implements OnInit {

  title = 'Crear nuevo Usuario';
  msg = 'Agregar nuevo usuario';
  btn = 'Guardar';
  btn2 = 'Cancelar';
  user?: User;
  showPassword = false;
  showConfirmPassword = false;
  isPasswordChange = false;
  roles = [
    {rol: RoleEnum.ADMIN, desc: 'Administrador'},
    {rol: RoleEnum.AINV, desc: 'Analista de inversiones'},
    {rol: RoleEnum.APYC, desc: 'Analista de planeamiento y control'},
    {rol: RoleEnum.JPYC, desc: 'Jefe de planeamiento y Control'}
  ];
  formGroup = this.formBuilder.group(
    {
      username: ['', Validators.required],
      password: '',
      passwordRepeat: '',
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      rol: ['', Validators.required]
    },
    {
      validators: confirmPasswordValidator('password', 'passwordRepeat')
    },
  );

  constructor(
    private dialogRef: MatDialogRef<AdminAddUserDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data.msg) {
      this.msg = this.data.msg;
      this.btn = this.data.btn;
      this.btn2 = this.data.btn2;
      this.title = this.data.title;
      this.user = this.data.item;
    }
    this.createForms();
  }

  createForms(): void {
    if (this.user) {
      this.formGroup.get('username')?.setValue(this.user.username);
      this.formGroup.get('password')?.setValue(this.user.password);
      this.formGroup.get('passwordRepeat')?.setValue(this.user.password);
      this.formGroup.get('firstName')?.setValue(this.user.first_name);
      this.formGroup.get('lastName')?.setValue(this.user.last_name);
      this.formGroup.get('email')?.setValue(this.user.email);
      this.formGroup.get('rol')?.setValue(this.user.role);
    } else {
      this.enableChangePassword();
    }
  }

  save(): void {
    if (!this.user && this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      return;
    }

    const data = {
      username: this.formGroup.value.username,
      password: this.formGroup.value.password,
      role: this.formGroup.value.rol,
      email: this.formGroup.value.email ?
        this.formGroup.value.email : `${this.formGroup.value.username}@mail.com`,
      first_name: this.formGroup.value.firstName,
      last_name: this.formGroup.value.lastName,
    };

    if (this.user && this.user.id) {
      this.userService.adminEditUser(this.user.id, data).subscribe(resp => {
        this.close(true);
      }, error => {
        console.log(error);
        // this.close(true);
        if (error === 'BAD REQUEST') {
          this.openSnackBar('Ha ocurrido un problema', 'Verifique si el usuario ya existe');
        } else {
          this.openSnackBar('Ha ocurrido un problema', 'Intente de nuevo mas tarde');
        }
      });
    } else {
      this.userService.adminCreateUser(data).subscribe(resp => {
        this.close(true);
      }, error => {
        console.log(error);
        // this.close(true);
        if (error === 'BAD REQUEST') {
          this.openSnackBar('Ha ocurrido un problema', 'Verifique si el usuario ya existe');
        } else {
          this.openSnackBar('Ha ocurrido un problema', 'Verifique si el usuario ya existe');
        }
      });
    }
  }

  enableChangePassword(): void {
    this.isPasswordChange = true;
    this.formGroup.get('password')?.setValidators(Validators.required);
    this.formGroup.get('passwordRepeat')?.setValidators(Validators.required);
  }

  openSnackBar(message: string, message2: string): void {
    this.snackBar.open(message, message2);
  }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}
