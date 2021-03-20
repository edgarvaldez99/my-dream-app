import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { LoadingDialogComponent } from './dialogs/loading-dialog/loading-dialog.component';
import { HttpErrorService } from './services/http-error.service';
import { LoadingService } from './services/loading.service';
import { HttpErrorSnackBarComponent } from './shared/http-error-snack-bar/http-error-snack-bar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  loading = false;
  loadingDialogRef: MatDialogRef<LoadingDialogComponent> | undefined;
  loadingSubscription: Subscription | undefined;
  httpErrorSubscription: Subscription | undefined;
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private httpErrorService: HttpErrorService,
    private loadingService: LoadingService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.listenErrors();
    this.listenLoading();
  }

  ngOnDestroy(): void {
    this.httpErrorSubscription?.unsubscribe();
    this.loadingSubscription?.unsubscribe();
  }

  listenErrors(): void {
    this.httpErrorSubscription = this.httpErrorService
      .getHttpErrorListObservable()
      .subscribe((errors: string[]) => {
        this.snackBar.openFromComponent(HttpErrorSnackBarComponent, {
          verticalPosition: this.verticalPosition,
          panelClass: ['http-error-snackbar'],
          duration: 999999,
          data: errors,
        });
      });
  }

  listenLoading(): void {
    this.loadingSubscription = this.loadingService
      .getLoadingObservable()
      .subscribe((l) => {
        if (l) {
          if (!this.loadingDialogRef) {
            this.loadingDialogRef = this.openLoadingDialog();
          }
        } else if (this.loadingDialogRef) {
          this.loadingDialogRef.close();
        }
        setTimeout(() => {
          this.loading = l;
        }, 0);
      });
  }

  openLoadingDialog(): MatDialogRef<LoadingDialogComponent> {
    return this.dialog.open(LoadingDialogComponent, {
      panelClass: 'loading-dialog',
      disableClose: true,
    });
  }
}
