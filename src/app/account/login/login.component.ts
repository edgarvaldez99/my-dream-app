import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ForgotPasswordDialogComponent } from 'src/app/dialogs/forgot-password-dialog/forgot-password-dialog.component';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLoading$ = this.loadingService.getLoadingObservable();
  showPassword = false;
  loginForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  constructor(
    private router: Router,
    public formBuilder: FormBuilder,
    private authService: AuthService,
    private loadingService: LoadingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void { }

  login(): void {
    const username = this.loginForm.get('username')?.value || '';
    const password = this.loginForm.get('password')?.value || '';
    this.authService.login(username, password)
      .subscribe(resp => {
        if (this.authService.loggedUserHasRole(RoleEnum.ADMIN)) {
          this.router.navigate(['/'], { replaceUrl: true });
        }
        if (this.authService.loggedUserHasRole(RoleEnum.AINV)) {
          this.router.navigate(['/'], { replaceUrl: true });
          console.log(this.authService.loggedUserHasRole(RoleEnum.AINV));
          console.log(resp.user.first_name);
          console.log('Se inicio con AINV');
        }
      });
  }

  forgotPass(): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(ForgotPasswordDialogComponent, {
      disableClose: false,
      width: '500px',
      data: {
        title: 'Olvidé mi contraseña',
        msg: 'Solicitar un cambio de contraseña.',
        btn: 'ENVIAR',
        btn2: 'CANCELAR'
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe(data => {
      // Preguntar si se presiono sobre Cancelar
      const isConfirm = typeof data === 'boolean' && data === true;
      if (isConfirm) {
        this.openSnackBar('Aguarde un momento');
      }
    });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Procesando');
  }

}
