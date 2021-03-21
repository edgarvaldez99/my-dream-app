import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelpBuyerDialogComponent } from 'src/app/dialogs/help-buyer-dialog/help-buyer-dialog.component';
import { RoleEnum } from 'src/app/enums/role.enum';
import { AuthService } from 'src/app/services/auth.service';
import { MenuConfigService } from 'src/app/services/menu-config.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userObservable$ = this.authService.getLoggedUserObservable();

  get isAdmin(): boolean {
    return this.authService.loggedUserHasRole(RoleEnum.ADMIN);
  }

  constructor(
    public dialog: MatDialog,
    public menuConfigService: MenuConfigService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void { }

  logout(): void {
    this.authService.logout();
  }

  toggleSidebarMenu(): void {
    this.menuConfigService.toggleSidebarMenu();
  }

  openHelpDialog(fromPage: string): void {
    // Abre el popup de edicion
    const editDialog = this.dialog.open(HelpBuyerDialogComponent, {
      disableClose: false,
      data: fromPage,
      maxWidth: '550px',
      width: '80vw',
    });

    // Se ejcuta luego de cerrarse el popup
    editDialog.afterClosed().subscribe((data: boolean) => {
      const isCopy = data;
      if (isCopy) {

      }
    });
  }
}
