import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AdminAddCurrencyDialogComponent } from 'src/app/dialogs/admin-add-currency-dialog/admin-add-currency-dialog.component';
import { Currency } from 'src/app/interfaces/currency';
import { CurrencyService } from 'src/app/services/currency.service';
import { FilterService } from 'src/app/services/filter.service';

@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.scss']
})
export class CurrencyComponent implements OnInit {

  isLoading = false;
  filterValue = '';

  // listado
  currencyList: Currency[] = [];
  displayedColumns: string[] = ['moneda', 'simbolo', 'cotizacion_actual', 'actions'];
  dataSource = new MatTableDataSource(this.currencyList);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator | null = null;
  @ViewChild(MatSort, { static: true }) sort: MatSort | null = null;

  constructor(
      public dialog: MatDialog,
      private snackBar: MatSnackBar,
      private filterService: FilterService,
      private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    this.filterService.observable().subscribe(filter => {
      this.filterValue = filter;
      this.filter();
    });
    this.getList();
  }

  getList(): void {
    this.isLoading = true;
    this.currencyService.getList().subscribe(
      resp => {
        this.currencyList = resp;
        this.dataSource.data = this.currencyList;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.isLoading = false;
      }, () => {
        this.isLoading = false;
      }
    );
  }

  add(): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(AdminAddCurrencyDialogComponent, {
      disableClose: false,
      width: '500px',
      data: {
        title: 'Nueva Moneda',
        msg: 'Agregar nueva moneda',
        btn: 'AGREGAR',
        btn2: 'CANCELAR',
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe(data => {
      // Preguntar si se presiono sobre Cancelar
      const isConfirm = typeof data === 'boolean' && data === true;
      if (isConfirm) {
        this.openSnackBar('Aguarde un momento');
        this.getList();
      }
    });
  }

  edit(item: Currency): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(AdminAddCurrencyDialogComponent, {
      disableClose: false,
      width: '500px',
      data: {
        title: 'Actualizar Moneda',
        msg: 'Estas por actualizar los datos de la moneda',
        btn: 'EDITAR',
        btn2: 'CANCELAR',
        item,
      }
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe(data => {
      // Preguntar si se presiono sobre Cancelar
      const isConfirm = typeof data === 'boolean' && data === true;
      if (isConfirm) {
        this.openSnackBar('Aguarde un momento');
        this.getList();
      }
    });
  }

  openSnackBar(message: string, action = 'Procesando'): void {
    this.snackBar.open(message, action);
  }

  filter(): void {
    this.dataSource.filter = this.filterValue;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
}
