import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RoleEnum } from 'src/app/enums/role.enum';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

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
  user: User | undefined;
  showPassword = true;
  showConfirmPassword = true;
  isPasswordChange = false;
  roles = [
    {rol: RoleEnum.ADMIN, desc: 'Administrador'},
    {rol: RoleEnum.AINV, desc: 'Analista de inversiones'},
    {rol: RoleEnum.APYC, desc: 'Analista de planeamiento y control'},
    {rol: RoleEnum.JPYC, desc: 'Jefe de planeamiento y Control'}
  ];
  formGroup = this.formBuilder.group({
    usernameCtrl: ['', Validators.required],
    passwordCtrl: ['', Validators.required],
    passwordRepeatCtrl: ['', Validators.required],
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    emailCtrl: ['', Validators.required],
    rolCtrl: ['', Validators.required]
  });


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
      this.user = this.data.user;
    }
    this.createForms();
  }

  createForms(): void {
    if (this.user) {
      this.formGroup.get('usernameCtrl')?.setValue(this.user.username);
      this.formGroup.get('passwordCtrl')?.setValue(this.user.password);
      this.formGroup.get('passwordRepeatCtrl')?.setValue(this.user.password);
      this.formGroup.get('firstNameCtrl')?.setValue(this.user.first_name);
      this.formGroup.get('lastNameCtrl')?.setValue(this.user.last_name);
      this.formGroup.get('emailCtrl')?.setValue(this.user.email);
      this.formGroup.get('rolCtrl')?.setValue(this.user.role);
    } else {
      this.isPasswordChange = true;
    }
  }

  add(): void {
    if (!this.user && this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      this.openSnackBar('Campos Incompletos', 'Complete los campos requeridos');
      return;
    }

    if ((this.formGroup.value.usernameCtrl === '') || (this.formGroup.value.firstNameCtrl === '') || (this.formGroup.value.lastNameCtrl === '') || (this.formGroup.value.passwordCtrl === '') || (this.formGroup.value.passwordRepeatCtrl === '') || (this.formGroup.value.emailCtrl === '')) {
      this.openSnackBar('Campos Incompletos', 'Complete los campos requeridos');
      return;
    }

    if (this.formGroup.value.passwordCtrl !== this.formGroup.value.passwordRepeatCtrl) {
      this.openSnackBar('Error', 'Las contraseñas nuevas no coinciden');
      return;
    }

    const data = {
      username: this.formGroup.value.usernameCtrl,
      password: this.formGroup.value.passwordCtrl,
      role: this.formGroup.value.rolCtrl,
      email: this.formGroup.value.emailCtrl ?
        this.formGroup.value.emailCtrl : `${this.formGroup.value.usernameCtrl}@mail.com`,
      first_name: this.formGroup.value.firstNameCtrl,
      last_name: this.formGroup.value.lastNameCtrl,
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

  openSnackBar(message: string, message2: string): void {
    this.snackBar.open(message, message2);
  }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}
