import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ProyectoInversion } from 'src/app/interfaces/proyecto-inversion';
import { FilterService } from 'src/app/services/filter.service';
import { ProyectoInversionService } from 'src/app/services/proyecto-inversion.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss']
})
export class ProjectListComponent implements OnInit {

  user: any;
  isLoading = false;
  isLoadingConf = false;
  isLoadingConfId = -1;
  isMobile = false;
  filterValue = '';
  messageList = '¡Aguarde un momento!';
  isAdminAdmin = false;
  role = null;

  // listado
  listProjects: ProyectoInversion[] = [];
  displayedColumns: string[] = ['proyectos', 'estado', 'responsable', 'rol', 'fecha_creacion', 'fecha_edicion', 'usuario', 'ver_detalle'];
  dataSource: MatTableDataSource<ProyectoInversion>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  constructor(
    public dialog: MatDialog,
    private proyectoInversionService: ProyectoInversionService,
    private filterService: FilterService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource(this.listProjects);
  }

  ngOnInit(): void {
    this.filterService.observable().subscribe((filter) => {
      this.filterValue = filter;
      this.filter();
    });
    this.projectList();

    this.dataSource.filterPredicate = (data: ProyectoInversion, searchText: string) => {
      const regex = new RegExp(searchText, 'gi');
      const result =
        regex.test(data.proyecto ?? '') ||
        regex.test(data.estado ?? '') ||
        regex.test(data.domicilio) ||
        regex.test(data.responsable ?? '') ||
        regex.test(data.fecha_creacion) ||
        regex.test(data.fecha_edicion ?? '') ||
        regex.test(data.razon_social) ||
        regex.test(data.rol ?? '') ||
        regex.test(data.id?.toString() ?? '') ||
        regex.test(data.usuario ?? '');
      /*console.log(result, searchText);*/
      return result;
    };
  }

  projectList(): void {
    this.isLoading = true;
    this.proyectoInversionService.getList().subscribe(resp => {
      this.listProjects = resp;
      this.dataSource.data = this.listProjects;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    }, (error: string[]) => {
      console.log(error);
      this.isLoading = false;
    });
  }

  openSnackBar(message: string, label = 'Procesando'): void {
    this.snackBar.open(message, label);
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
