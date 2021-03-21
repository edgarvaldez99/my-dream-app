import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { AddEvaluationDialogComponent } from 'src/app/dialogs/add-evaluation-dialog/add-evaluation-dialog.component';
import { ProyectoInversion } from 'src/app/interfaces/proyecto-inversion';
import { FilterService } from 'src/app/services/filter.service';
import { ProyectoInversionService } from 'src/app/services/proyecto-inversion.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.scss']
})
export class ProjectDetailComponent implements OnInit {

  isLoading = false;
  isLoadingConf = false;
  isLoadingConfId = -1;
  isMobile = false;
  filterValue = '';
  messageList = '¡Aguarde un momento!';
  isAdminAdmin = false;
  item: ProyectoInversion | undefined;

  // listado
  listEvaluations: ProyectoInversion[] = [];
  displayedColumns: string[] = ['evaluaciones', 'escenarios', 'versiones', 'estados', 'fecha_creacion', 'fecha_edicion', 'usuarios', 'tir', 'van', 'payback', 'acciones'];
  dataSource: MatTableDataSource<ProyectoInversion>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private proyectoInversionService: ProyectoInversionService,
    private filterService: FilterService,
    private snackBar: MatSnackBar,
  ) {
    this.dataSource = new MatTableDataSource(this.listEvaluations);
  }

  ngOnInit(): void {
    this.filterService.observable().subscribe(filter => {
      this.filterValue = filter;
      this.filter();
    });
    this.evaluationList();
    const id = this.route.snapshot.params.id;
    this.proyectoInversionService.detail(id).subscribe({
      next: (item) => this.setDetail(item),
    });
  }

  evaluationList(): void {
    this.isLoading = true;

    this.proyectoInversionService.getList().subscribe(resp => {
      this.listEvaluations = resp;
      this.dataSource.data = this.listEvaluations;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    }, error => {
      console.log(error);
      this.isLoading = false;
    });
  }

  setDetail(item: ProyectoInversion): void {
    this.item = item;
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

  newEvaluation(): void {
    this.dialog
      .open(AddEvaluationDialogComponent)
      .afterClosed()
      .subscribe(data => {
        // Preguntar si se presiono sobre Cancelar
        const isConfirm = typeof data === 'boolean' && data === true;
        if (isConfirm) {
          this.openSnackBar('Aguarde un momento');
          this.evaluationList();
        }
      });
  }

}
