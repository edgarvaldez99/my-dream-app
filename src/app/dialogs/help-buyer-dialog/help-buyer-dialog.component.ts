import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-help-buyer-dialog',
  templateUrl: './help-buyer-dialog.component.html',
  styleUrls: ['./help-buyer-dialog.component.scss']
})
export class HelpBuyerDialogComponent implements OnInit {

  fromPage = '';
  isLoading = false;
  user: any;

  constructor(
    private dialogRef: MatDialogRef<HelpBuyerDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: string,
    private authService: AuthService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.fromPage = this.data;
    }
    this.user = this.authService.loggedUser();
  }

  close(bool: boolean): void {
    this.dialogRef.close(bool);
  }

  openSnackBar(message: string): void {
    this.snackBar.open(message, 'Aguarde un momento');
  }

  downloadFile(type: string): void {
    this.isLoading = true;
    const url = `${environment.api}/manuals?type=${type}`;
    this.downloadPdf(url, `FJK_RIFA_2020_MANUAL_${type.toUpperCase()}.pdf`);
    this.openSnackBar('El manual se descargará en breve');
    this.close(false);
  }

  downloadPdf(pdfUrl: string, pdfName: string): void {
    saveAs(pdfUrl, pdfName);
    this.isLoading = false;
  }
}
