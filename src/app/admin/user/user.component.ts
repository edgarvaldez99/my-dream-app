import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActiveInactiveDialogComponent } from 'src/app/dialogs/active-inactive-dialog/active-inactive-dialog.component';
import { AdminAddUserDialogComponent } from 'src/app/dialogs/admin-add-user-dialog/admin-add-user-dialog.component';
import { RoleEnum } from 'src/app/enums/role.enum';
import { UserStatusEnum } from 'src/app/enums/user-status.enum';
import { ActiveInactiveData } from 'src/app/interfaces/active-inactive-data';
import { User } from 'src/app/interfaces/user';
import { FilterService } from 'src/app/services/filter.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  user: User | undefined;
  estados = [
    { estado: UserStatusEnum.ACTIVE },
    { estado: UserStatusEnum.INACTIVE }
  ];
  roles = [
    { rol: RoleEnum.ADMIN, desc: 'Administrador' },
    { rol: RoleEnum.AINV, desc: 'Analista de inversiones' },
    { rol: RoleEnum.APYC, desc: 'Analista de planeamiento y control' },
    { rol: RoleEnum.JPYC, desc: 'Jefe de planeamiento y control' }
  ];
  activeFilter: { [key: string]: string } = {
    Activo: 'a0c1',
    Inactivo: 'i0a1'
  };
  isLoading = false;
  isMobile = false;
  filterValue = '';
  searchFormControl = new FormControl(null);

  // listado
  listUsers: User[] = [];
  displayedColumns = ['users', 'name', 'status', 'lastlogin', 'rol', 'actions'];
  dataSource: MatTableDataSource<User>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  role = null;

  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private userService: UserService,
    private filterService: FilterService,
  ) {
    this.dataSource = new MatTableDataSource(this.listUsers);
  }

  ngOnInit(): void {
    this.searchFormControl.valueChanges.subscribe((val) => {
      this.doFilter(val);
    });
    this.filterService.observable().subscribe(filter => {
      this.filterValue = filter;
      this.filter();
    });
    this.listUsersAll();

    this.dataSource.filterPredicate = (data: User, searchText: string) => {
      const regex = new RegExp(searchText, 'gi');
      const result =
        regex.test(data.ci ?? '') ||
        regex.test(data.email) ||
        regex.test(data.first_name) ||
        regex.test(data.id?.toString() ?? '') ||
        regex.test(data.last_name) ||
        regex.test(data.role) ||
        regex.test(data.status ?? '') ||
        regex.test(this.activeFilter[data.status ?? '']) ||
        regex.test(data.username);
      /*console.log(result, searchText);*/
      return result;
    };
  }

  listUsersAll(): void {
    this.isLoading = true;
    this.userService.getList().subscribe(resp => {
      this.listUsers = resp;
      this.dataSource.data = this.listUsers;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  add(): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(AdminAddUserDialogComponent, {
      data: {
        title: 'Nuevo Usuario',
        msg: 'Agregar nuevo usuario',
        btn: 'AGREGAR',
        btn2: 'CANCELAR',
        user: null
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe(data => {
      // Preguntar si se presiono sobre Cancelar
      const isConfirm = typeof data === 'boolean' && data === true;
      if (isConfirm) {
        this.openSnackBar('Aguarde un momento');
        this.listUsersAll();
      }
    });
  }

  edit(user: User): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(AdminAddUserDialogComponent, {
      disableClose: false,
      width: '500px',
      data: {
        title: 'Editar usuario',
        msg: 'Estas por actualizar los datos del usuario',
        btn: 'EDITAR',
        btn2: 'CANCELAR',
        user: user ? user : null
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe(data => {
      // Preguntar si se presiono sobre Cancelar
      const isConfirm = typeof data === 'boolean' && data === true;
      if (isConfirm) {
        this.openSnackBar('Aguarde un momento');
        this.listUsersAll();
      }
    });
  }

  activeInactive(user: User): void {
    const title = 'Cambiar estado';
    const msg = 'Estas por cambiar el estado del usuario';
    const btn = 'ACEPTAR';
    const btn2 = 'CANCELAR';

    // Abre el popup de edicion
    const editDialog = this.dialog.open(ActiveInactiveDialogComponent, {
      disableClose: false,
      width: '500px',
      data: {
        title,
        msg,
        btn,
        btn2,
        user,
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe((data: ActiveInactiveData) => {
      // Preguntar si se presiono sobre Cancelar
      const status = data.status || UserStatusEnum.INACTIVE;
      if (data.accept && user.id) {
        this.openSnackBar('Aguarde un momento');
        this.userService.changeStatus(user.id, status).subscribe(
          (resp) => {
            this.listUsersAll();
          },
          (error) => {
            console.log(error);
            this.openSnackBar('Ha ocurrido un problema', 'Error');
          }
        );
      }
    });
  }

  openSnackBar(message: string, action = 'Procesando'): void {
    this.snackBar.open(message, action);
  }

  doFilter(value: string): void {
    this.dataSource.filter = value.trim().toLocaleLowerCase();
  }

  filter(): void {
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
