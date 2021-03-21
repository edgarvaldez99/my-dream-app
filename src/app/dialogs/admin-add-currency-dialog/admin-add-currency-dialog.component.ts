import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/interfaces/dialog-data';
import { CurrencyService } from 'src/app/services/currency.service';
import { Currency } from 'src/app/interfaces/currency';

@Component({
  selector: 'app-admin-add-currency-dialog',
  templateUrl: './admin-add-currency-dialog.component.html',
  styleUrls: ['./admin-add-currency-dialog.component.scss']
})
export class AdminAddCurrencyDialogComponent implements OnInit {

  title = 'Crear Moneda';
  msg = 'Agregar nueva moneda';
  btn = 'Guardar';
  btn2 = 'Cancelar';
  currency?: Currency;
  formGroup = this.formBuilder.group({
    name: ['', Validators.required],
    symbol: ['', Validators.required],
    current_quote: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<AdminAddCurrencyDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: DialogData,
    private formBuilder: FormBuilder,
    private currencyService: CurrencyService,
  ) { }

  ngOnInit(): void {
    if (this.data.msg) {
      this.msg = this.data.msg;
      this.btn = this.data.btn;
      this.btn2 = this.data.btn2;
      this.title = this.data.title;
      this.currency = this.data.item;
    }
    this.createForms();
  }

  createForms(): void {
    if (this.currency) {
      this.formGroup.get('name')?.setValue(this.currency.name);
      this.formGroup.get('symbol')?.setValue(this.currency.symbol);
      this.formGroup.get('current_quote')?.setValue(this.currency.current_quote);
    }
  }

  save(): void {
    if (!this.currency && this.formGroup.invalid) {
      this.formGroup.markAllAsTouched();
      this.formGroup.markAsDirty();
      return;
    }

    const data = this.formGroup.value as Currency;
    if (this.currency && this.currency.id) {
      this.currencyService.edit(this.currency.id, data).subscribe(() => {
        this.close(true);
      });
    } else {
      this.currencyService.create(data).subscribe(() => {
        this.close(true);
      });
    }
  }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }
}
